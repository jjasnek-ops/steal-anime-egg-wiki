import { readdir, readFile, writeFile } from 'node:fs/promises';
import { load } from 'cheerio';
const files = await readdir('dist');
for (const file of files.filter(x => /^sitemap-\d+\.xml$/.test(x))) {
  const xml = load(await readFile('dist/' + file, 'utf8'), { xmlMode: true });
  xml('url').each((_, node) => {
    const loc = xml(node).find('loc').text();
    if (['/404', '/privacy'].includes(new URL(loc).pathname.replace(/\/$/, ''))) xml(node).remove();
  });
  await writeFile('dist/' + file, xml.xml());
}
console.log('Sitemap cleaned: error and privacy pages excluded; no freshness dates fabricated.');

