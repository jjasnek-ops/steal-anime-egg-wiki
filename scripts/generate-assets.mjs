import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';
const egg = (await readFile('src/assets/egg-illustration.svg', 'utf8')).replace('<svg ', '<svg x="730" y="84" width="390" height="390" ');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#11101b"/><path d="M65 65h1070v500H65Z" fill="none" stroke="#373044"/><rect x="86" y="85" width="286" height="38" rx="19" fill="#271a42"/><text x="103" y="111" font-family="Segoe UI" font-weight="600" font-size="19" fill="#d4c3ff">UNOFFICIAL ROBLOX GUIDE</text><text x="85" y="232" font-family="Segoe UI" font-weight="700" font-size="68" fill="#faf7ff">Steal Anime</text><text x="85" y="312" font-family="Segoe UI" font-weight="700" font-size="68" fill="#baa1ff">Egg Wiki</text><text x="87" y="390" font-family="Segoe UI" font-size="26" fill="#cbc3d9">Codes status. Beginner route.</text><text x="87" y="428" font-family="Segoe UI" font-size="26" fill="#cbc3d9">The right game. Verified facts.</text><text x="88" y="535" font-family="Segoe UI" font-size="23" fill="#d5ff89">stealanimeegg.wiki</text>${egg}</svg>`;
await mkdir('public/og', { recursive: true });
await writeFile('public/og/wiki.png', new Resvg(svg, { font: { loadSystemFonts: true, defaultFontFamily: 'Segoe UI' } }).render().asPng());
console.log('Generated original 1200 × 630 social card.');

