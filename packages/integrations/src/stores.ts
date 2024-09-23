import { existsSync } from 'node:fs';
import { writeFile, mkdir } from 'node:fs/promises';
import { platform } from 'node:os';
import * as path from 'node:path';

const allStores = new Map();

export class ConfiguStores {
  static register(name: string, store: any) {
    allStores.set(name, store);
  }

  // eslint-disable-next-line consistent-return
  static async getOne(key: string) {
    const store = allStores.get(key);
    if (store) {
      return store;
    }
    const VERSION = 'latest';
    const CONFIGU_HOME = path.join(process.cwd(), '/.configu-cache');

    const STORE_PATH = path.join(CONFIGU_HOME, `/${key}-${VERSION}.js`);

    if (!existsSync(STORE_PATH)) {
      const res = await fetch(
        `https://github.com/configu/configu/releases/download/${VERSION}/${key}-${platform()}.js`,
      );
      if (res.ok) {
        await mkdir(CONFIGU_HOME, { recursive: true });
        await writeFile(STORE_PATH, await res.text());
      }
    }

    // eslint-disable-next-line global-require,import/no-dynamic-require
    require(STORE_PATH);
    return allStores.get(key);
  }
}
