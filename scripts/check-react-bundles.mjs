import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const packages = ['easy-email-core', 'easy-email-editor', 'easy-email-extensions'];
let checkedMaps = 0;

for (const name of packages) {
  const lib = path.join(root, 'packages', name, 'lib');
  const files = await readdir(lib, { recursive: true });
  const maps = files.filter((file) => /\.(?:m?js|cjs)\.map$/.test(file));
  assert(maps.length > 0, `${name}: no bundle source maps; run pnpm build first`);

  for (const file of maps) {
    const map = JSON.parse(await readFile(path.join(lib, file), 'utf8'));
    assert(Array.isArray(map.sources), `${name}/${file}: missing source list`);
    const bundledReact = map.sources.filter((source) =>
      /(?:^|\/)node_modules\/(?:react|react-dom)\//.test(source.replaceAll('\\', '/'))
    );
    assert.deepEqual(bundledReact, [], `${name}/${file}: bundled React runtime`);
    checkedMaps++;
  }

  for (const file of files.filter((file) => /\.(?:m?js|cjs)$/.test(file))) {
    const code = await readFile(path.join(lib, file), 'utf8');
    assert(
      !code.includes('Incompatible React versions'),
      `${name}/${file}: bundled React DOM version guard`
    );
  }
}

console.log(`PASS: ${checkedMaps} bundle source maps contain no React or React DOM runtime`);
