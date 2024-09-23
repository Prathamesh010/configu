import { existsSync } from 'node:fs';
import { writeFile, mkdir } from 'node:fs/promises';
import { platform } from 'node:os';
import * as path from 'node:path';
import { ConfiguStores as BaseConfiguStores } from '@configu/integrations';
import { ConfigStore } from '@configu/ts';

// TODO: need to have allStores in the class, can't access it otherwise

export class ConfiguStores extends BaseConfiguStores {
  // TODO: needs to be string, ConfigStore
  private static allStores = new Map<string, any>();
  static register(name: string, store: any) {
    this.allStores.set(name, store);
  }

  // TODO: properly override getOne or make it abstract
  static async getOne2({
    key,
    cacheDir,
    configuration,
    version,
  }: {
    key: string;
    cacheDir: string;
    configuration?: Record<string, unknown>;
    version?: string;
  }): Promise<ConfigStore> {
    const store = this.allStores.get(key);
    if (store) {
      return store;
    }
    const storeVersion = version ?? 'latest';

    const STORE_PATH = path.join(cacheDir, `/${key}-${storeVersion}.js`);

    if (!existsSync(STORE_PATH)) {
      const res = await fetch(
        `https://github.com/configu/configu/releases/download/${storeVersion}/${key}-${platform()}.js`,
      );
      if (res.ok) {
        await mkdir(cacheDir, { recursive: true });
        await writeFile(STORE_PATH, await res.text());
      } else {
        throw new Error(`Store "${key}" not found`);
      }
    }

    // eslint-disable-next-line global-require,import/no-dynamic-require
    require(STORE_PATH);
    const StoreCtor = this.allStores.get(key);
    return new StoreCtor(configuration);
  }
}
