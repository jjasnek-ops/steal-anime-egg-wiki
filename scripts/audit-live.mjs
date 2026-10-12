import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { load } from 'cheerio';

const run = promisify(execFile);
const origin = 'https://stealanimeegg.wiki';
const scratchRoot = process.env.WIKI_AUDIT_WORK_DIR || join(process.cwd(), 'work');
await mkdir(scratchRoot, { recursive: true });
const scratch = await mkdtemp(join(scratchRoot, 'http-'));
const contentRoutes = ['/', '/codes', '/guide', '/guides', '/which-game', '/updates', '/sources', '/about', '/privacy'];
const requests = [...contentRoutes, '/robots.txt', '/sitemap-index.xml', '/sitemap-0.xml', '/og/wiki.png', '/pagefind/pagefind.js', '/this-page-does-not-exist', '/index.html', '/codes.html', 'http://stealanimeegg.wiki/codes'];
const failures = [];
let totalChecks = 0;
const check = (condition, message) => { totalChecks++; if (!condition) failures.push(message); };
const captures = [];

// Read the deployed HTTP responses. This does not control a browser, use account
// credentials, or bypass TLS verification. curl uses the host's trusted TLS stack.
async function capture(path, index) {
  const url = path.startsWith('http') ? path : origin + path;
  const bodyFile = join(scratch, index + '.body');
  const headerFile = join(scratch, index + '.headers');
  const args = ['--silent', '--show-error', '--location', '--connect-timeout', '10', '--max-time', '35', '--dump-header', headerFile, '--output', bodyFile, '--write-out', '%{json}', url];
  try {
    const { stdout } = await run(process.platform === 'win32' ? 'curl.exe' : 'curl', args, { maxBuffer: 3_000_000 });
    const transfer = JSON.parse(stdout);
    const body = await readFile(bodyFile);
    const headerText = await readFile(headerFile, 'utf8');
    return { path, url, status: transfer.http_code, finalUrl: transfer.url_effective, contentType: transfer.content_type, redirects: transfer.num_redirects, bytes: body.length, seconds: transfer.time_total, tlsVerified: transfer.ssl_verify_result === 0, body, headerText };
  } catch (error) {
    return { path, url, status: 0, error: String(error.message).slice(0, 500) };
  }
}
for (let start = 0; start < requests.length; start += 4) {
  captures.push(...await Promise.all(requests.slice(start, start + 4).map((path, n) => capture(path, start + n))));
}
for (const item of captures) {
  const expectedStatus = item.path === '/this-page-does-not-exist' ? 404 : 200;
  check(item.status === expectedStatus, `${item.path}: expected ${expectedStatus}, received ${item.status}`);
  if (!item.body) continue;
  check(item.tlsVerified, `${item.path}: TLS verification failed`);
  if (contentRoutes.includes(item.path)) {
    const $ = load(item.body.toString('utf8'));
    check($('h1').length === 1, `${item.path}: one H1 required`);
    check($('link[rel=canonical]').attr('href') === origin + item.path, `${item.path}: canonical mismatch`);
    check($('meta[property="og:url"]').attr('content') === origin + item.path, `${item.path}: OG URL mismatch`);
    check($('html').attr('lang') === 'en', `${item.path}: English document required`);
    check($('body').text().includes('This is an unofficial fan-made guide website.'), `${item.path}: fan disclaimer missing`);
    check(/x-content-type-options:\s*nosniff/i.test(item.headerText), `${item.path}: nosniff header missing`);
    check($('meta[name=description]').attr('content')?.length > 30, `${item.path}: description missing`);
    if (item.path === '/codes') check($('body').text().includes('No active codes found.'), 'Codes answer missing');
    if (item.path === '/privacy') check($('meta[name=robots]').toArray().some(el => /noindex/.test($(el).attr('content'))), 'Privacy must be noindex');
    item.title = $('title').text();
    item.canonical = $('link[rel=canonical]').attr('href');
  }
  if (item.path === '/sitemap-0.xml') {
    const $ = load(item.body.toString('utf8'), { xmlMode: true });
    const locations = $('loc').map((_, el) => $(el).text()).get();
    check(locations.length === 8, 'Sitemap must contain exactly 8 approved indexable pages');
    check(locations.every(url => url.startsWith(origin) && !url.includes('.html') && !url.includes('/privacy') && !url.includes('/404')), 'Sitemap contains an unintended URL');
    item.locations = locations;
  }
  if (item.path === '/robots.txt') check(item.body.toString('utf8').includes(origin + '/sitemap-index.xml'), 'Robots sitemap URL missing');
  if (item.path === '/og/wiki.png') check(item.contentType?.includes('image/png'), 'OG PNG content type incorrect');
  if (item.path === '/index.html') check(item.finalUrl === origin + '/', 'index.html must redirect to clean homepage');
  if (item.path === '/codes.html') check(item.finalUrl === origin + '/codes', 'codes.html must redirect to clean URL');
  if (item.path.startsWith('http://')) check(item.finalUrl === origin + '/codes', 'HTTP must redirect to HTTPS');
}
const report = { checkedAt: new Date().toISOString(), origin, method: 'Actual public HTTP responses through curl; normal certificate verification; no browser automation', totalChecks, failures, requests: captures.map(({body, headerText, ...item}) => item) };
await writeFile('reports/live-http-audit.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ totalChecks, requests: captures.length, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
