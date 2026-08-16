/**
 * Publica os tokens como arquivo isolado além do CSS empacotado.
 * Um app Vue, um e-mail ou uma landing em HTML puro podem consumir a
 * mesma paleta sem carregar o CSS dos componentes React.
 */
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

await mkdir(resolve(root, 'dist'), { recursive: true });
await copyFile(resolve(root, 'src/styles/tokens.css'), resolve(root, 'dist/tokens.css'));
await copyFile(resolve(root, 'src/styles/global.css'), resolve(root, 'dist/global.css'));

console.log('tokens.css e global.css copiados para dist/');
