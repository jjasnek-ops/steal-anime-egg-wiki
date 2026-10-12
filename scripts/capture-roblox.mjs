import { mkdir, writeFile } from 'node:fs/promises';
const stamp = new Date().toISOString();
const urls = {
  game: 'https://games.roblox.com/v1/games?universeIds=10759478428',
  place: 'https://apis.roblox.com/universes/v1/places/96727061242653/universe',
  group: 'https://groups.roblox.com/v1/groups/424082979',
  comparison: 'https://games.roblox.com/v1/games?universeIds=10747748563,10763691543',
};
const directory = 'research/raw/rechecks/' + stamp.replace(/[:.]/g, '-');
await mkdir(directory, { recursive: true });
for (const [key, url] of Object.entries(urls)) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(key + ' HTTP ' + response.status);
  const body = await response.json();
  await writeFile(directory + '/' + key + '.json', JSON.stringify({ capturedAt: stamp, sourceUrl: url, body }, null, 2));
}
console.log('Evidence captured in ' + directory + '. Review changes manually. No content or freshness date was changed.');

