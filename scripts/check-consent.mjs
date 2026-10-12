import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
const source = await readFile('src/components/Analytics.astro', 'utf8');
const client = source.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(client, 'Actual analytics client script exists');
const compiled = ts.transpileModule(client, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText;
const id = 'G-2PSTQYJ16Z';
function session({ hostname = 'stealanimeegg.wiki', choice = null, failStorage = false } = {}) {
  const nodes = new Map();
  for (const name of ['analytics-controls','analytics-banner','analytics-status','analytics-allow','analytics-decline','analytics-preferences']) {
    nodes.set('#' + name, { dataset: { measurementId: id }, hidden: true, textContent: '', handlers: {}, addEventListener(type, fn) { this.handlers[type] = fn; }, focus() {} });
  }
  const scripts = [];
  const cookieWrites = [];
  const values = new Map(choice ? [['stealanimeegg-analytics-consent', choice]] : []);
  const document = {
    querySelector(selector) { return nodes.get(selector); },
    createElement(tag) { return { tag }; },
    head: { append(script) { scripts.push(script); } },
    get cookie() { return '_ga=example; theme=dark'; },
    set cookie(value) { cookieWrites.push(value); },
  };
  const storage = { getItem(key) { if (failStorage) throw new Error('blocked'); return values.get(key) || null; }, setItem(key,value) { if (failStorage) throw new Error('blocked'); values.set(key,value); } };
  const browser = {};
  vm.runInNewContext(compiled, { window: browser, document, location: { hostname }, localStorage: storage, Date, encodeURIComponent }, { timeout: 1000 });
  return { browser, scripts, nodes, values, cookieWrites, click(name) { nodes.get('#' + name).handlers.click(); } };
}
const checks = [];
const record = name => checks.push({ name, ok: true });
const first = session();
assert.equal(first.scripts.length, 0);
assert.equal(first.nodes.get('#analytics-banner').hidden, false);
record('No Google tag loads before opt-in on production');
first.click('analytics-allow');
assert.equal(first.scripts.length, 1);
assert.equal(first.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=' + id);
assert.equal(first.values.get('stealanimeegg-analytics-consent'), 'accepted');
const commands = first.browser.dataLayer.map(args => Array.from(args));
assert.equal(commands[0][0], 'consent');
assert.equal(commands[0][2].analytics_storage, 'granted');
assert.equal(commands[0][2].ad_storage, 'denied');
assert.equal(commands.find(args => args[0] === 'config')[1], id);
record('Opt-in uses the exact created stream and disables advertising signals');
first.click('analytics-decline');
assert.equal(first.browser['ga-disable-' + id], true);
assert.equal(first.values.get('stealanimeegg-analytics-consent'), 'declined');
assert.ok(first.cookieWrites.every(value => value.startsWith('_ga=')));
record('Revocation sets the documented opt-out flag and only clears analytics cookies');
first.click('analytics-preferences');
assert.equal(first.nodes.get('#analytics-banner').hidden, false);
first.click('analytics-allow');
assert.equal(first.scripts.length, 1);
assert.equal(first.browser['ga-disable-' + id], false);
record('Preferences can be changed without adding duplicate Google tags');
const denied = session({ choice: 'declined' });
assert.equal(denied.scripts.length, 0);
assert.equal(denied.browser['ga-disable-' + id], true);
record('Persisted refusal blocks analytics on later visits');
const preview = session({ hostname: 'steal-anime-egg-wiki.pages.dev', choice: 'accepted' });
preview.click('analytics-allow');
assert.equal(preview.scripts.length, 0);
record('Preview origin cannot send production analytics');
const blocked = session({ failStorage: true });
assert.equal(blocked.scripts.length, 0);
blocked.click('analytics-allow');
assert.equal(blocked.scripts.length, 1);
record('Blocked storage still requires an explicit choice for the current visit');
await writeFile('reports/consent-check.json', JSON.stringify({ checkedAt: new Date().toISOString(), method: 'Isolated execution of the actual transpiled client script. This is not proof of a real GA4 network receipt.', checks }, null, 2));
console.log('Consent flow: ' + checks.length + ' functional checks passed.');

