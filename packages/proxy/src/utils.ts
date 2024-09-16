import { ConfigStore } from '@configu/ts';
import { SQLiteConfigStore } from '@configu/node';
import path from 'node:path';
import { cosmiconfigSync } from 'cosmiconfig';
import _ from 'lodash';
import { ConfiguStores } from '@configu/integrations';
import { config } from './config';

const constructStore = (type: string, configuration: any): ConfigStore => {
  const StoreCtor = ConfiguStores.getOne(type);
  if (!StoreCtor) {
    throw new Error(`unknown store type ${type}`);
  }
  return new StoreCtor(configuration);
};

type StoreConfigurationObject = { type: string; configuration: Record<string, unknown>; backup?: boolean };
export class ConfiguInterfaceConfiguration {
  private static configPath: string;
  private static config: Partial<{
    stores: Record<string, StoreConfigurationObject>;
    backup: string;
    schemas: Record<string, string>;
    scripts: Record<string, string>;
  }> = {};

  static {
    const explorerSync = cosmiconfigSync('configu');
    const result = explorerSync.load(config.CONFIGU_CONFIG_FILE);
    if (result === null || result.isEmpty) {
      throw new Error('.configu file not found');
    }
    if (_.isEmpty(result.config.stores)) {
      throw new Error('no stores defined in .configu file');
    }
    this.config = result.config;
    this.configPath = result.filepath;
  }

  static getStoreInstance(storeName?: string): ConfigStore {
    if (!storeName) {
      throw new Error('Store is required');
    }
    const storeConfig = this.config.stores?.[storeName];
    if (!storeConfig) {
      throw new Error(`Store "${storeName}" not found`);
    }
    return constructStore(storeConfig.type, storeConfig.configuration);
  }

  static getBackupStoreInstance(storeName?: string) {
    if (!storeName) {
      return undefined;
    }
    const shouldBackup = this.config.stores?.[storeName]?.backup;
    if (!shouldBackup) {
      return undefined;
    }
    const database = this.config.backup ?? path.join(path.dirname(this.configPath), 'config.backup.sqlite');
    return new SQLiteConfigStore({
      database,
      tableName: storeName,
    });
  }
}
