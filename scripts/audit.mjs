import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
const origin = 'https://stealanimeegg.wiki';
const failures = [];
const checks = [];
const pages = new Map();
const check = (ok, name, detail = '') => { checks.push({ name, ok: !!ok, detail }); if (!ok) failures.push(name + ': ' + detail); };
const files = await readdir('dist');
for (const name of files.filter(n => n.endsWith('.html'))) {
  const route = name === 'index.html' ? '/' : '/' + name.replace(/\.html$/, '');
  pages.set(route, load(await readFile('dist/' + name, 'utf8')));
}
const expected = ['/', '/codes', '/guide', '/guides', '/which-game', '/updates', '/sources', '/about', '/privacy'];
check(expected.every(route => pages.has(route)), 'All expected routes generated', [...pages.keys()].join(', '));
const titles = new Set();
const descriptions = new Set();
const indexable = [];
for (const [route, $] of pages) {
  const title = $('title').text();
  const description = $('meta[name="description"]').attr('content') || '';
  const canonical = $('link[rel="canonical"]').attr('href');
  check($('title').length === 1 && title.length > 10, route + ' unique title element');
  check(!titles.has(title), route + ' distinct title', title); titles.add(title);
  check(description.length >= 35 && description.length <= 180, route + ' description length', String(description.length));
  check(!descriptions.has(description), route + ' distinct description'); descriptions.add(description);
  check($('h1').length === 1, route + ' one H1', String($('h1').length));
  check($('html').attr('lang') === 'en', route + ' English document language');
  check($('link[rel="canonical"]').length === 1 && canonical === origin + route, route + ' production canonical', canonical || '');
  check($('meta[property="og:url"]').attr('content') === origin + route, route + ' production Open Graph URL');
  check($('meta[property="og:image"]').length === 1 && $('meta[property="og:image"]').attr('content')?.startsWith(origin + '/'), route + ' production image URL');
  check($('meta[name="twitter:card"]').length === 1, route + ' single Twitter card');
  check($.text().includes('This is an unofficial fan-made guide website.'), route + ' unofficial disclaimer');
  const robots = $('meta[name="robots"]').map((_, e) => $(e).attr('content')).get().join(',');
  if (!robots.includes('noindex')) indexable.push(route);
  const jsonld = $('script[type="application/ld+json"]').map((_, e) => $(e).text()).get();
  check(jsonld.length > 0, route + ' JSON-LD present');
  for (const value of jsonld) {
    try { const schema = JSON.parse(value); check(schema['@context'] === 'https://schema.org', route + ' valid schema context'); }
    catch (error) { check(false, route + ' valid JSON-LD', error.message); }
  }
  for (const link of $('a[href]').toArray()) {
    const href = $(link).attr('href');
    if (!href || !href.startsWith('/') || href.startsWith('//')) continue;
    const url = new URL(href, origin);
    const targetRoute = url.pathname.replace(/\/$/, '') || '/';
    if (pages.has(targetRoute)) {
      if (url.hash) check(pages.get(targetRoute)('[id]').toArray().some(e => pages.get(targetRoute)(e).attr('id') === decodeURIComponent(url.hash.slice(1))), route + ' anchor ' + href);
    } else {
      try { await stat(path.join('dist', decodeURIComponent(url.pathname))); }
      catch { check(false, route + ' internal link', href); }
    }
  }
  for (const element of $('img').toArray()) {
    const src = $(element).attr('src') || '';
    check($(element).attr('alt') !== undefined, route + ' image alt text');
    if (src.startsWith('/')) try { await stat(path.join('dist', src)); } catch { check(false, route + ' local image', src); }
  }
}
check(pages.get('/codes')?.text().includes('No active codes found.'), 'Codes answers first and contains no invented active record');
check(pages.get('/privacy')?.('meta[name="robots"]').toArray().some(e=>pages.get('/privacy')(e).attr('content')?.includes('noindex')), 'Privacy noindex');
const sitemapFiles = files.filter(x=>/^sitemap-\d+\.xml$/.test(x));
const sitemapUrls = [];
for (const file of sitemapFiles) {
  const xml = load(await readFile('dist/' + file, 'utf8'), { xmlMode: true });
  sitemapUrls.push(...xml('url > loc').map((_, e)=>xml(e).text()).get());
}
check(sitemapUrls.length === indexable.length, 'Sitemap contains exactly indexable routes', sitemapUrls.join(', '));
check(sitemapUrls.every(url=>url.startsWith(origin + '/') && indexable.includes(new URL(url).pathname)), 'Sitemap origin and paths');
check(!sitemapUrls.some(url=>/privacy|404/.test(url)), 'No noindex pages in sitemap');
check((await readFile('dist/robots.txt','utf8')).includes('Sitemap: ' + origin + '/sitemap-index.xml'), 'Robots points to production sitemap');
try { await stat('dist/pagefind/pagefind.js'); check(true, 'Static Pagefind index present'); } catch { check(false, 'Static Pagefind index present'); }
const evidence = JSON.parse(await readFile('research/evidence-ledger.json','utf8'));
const ids = new Set(evidence.map(f=>f.id));
for (const file of await readdir('src/content/docs')) {
  if (!file.endsWith('.mdx')) continue;
  const content = await readFile('src/content/docs/' + file,'utf8');
  const match = content.match(/^factIds: (.+)$/m);
  check(!!match && JSON.parse(match[1]).every(id=>ids.has(id)), file + ' fact references exist');
}
const result = { checkedAt: new Date().toISOString(), origin, routes: [...pages.keys()], indexableRoutes: indexable, totalChecks: checks.length, failures, checks };
await writeFile('reports/technical-audit.json', JSON.stringify(result,null,2));
console.log(JSON.stringify({ totalChecks: checks.length, pages: pages.size, indexable: indexable.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;


