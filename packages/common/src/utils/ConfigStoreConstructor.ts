import {
  AWSParameterStoreConfigStore,
  AWSSecretsManagerConfigStore,
  AzureKeyVaultConfigStore,
  CockroachDBConfigStore,
  ConfiguConfigStore,
  GCPSecretManagerConfigStore,
  HashiCorpVaultConfigStore,
  IniFileConfigStore,
  InMemoryConfigStore,
  JsonFileConfigStore,
  KubernetesSecretConfigStore,
  MariaDBConfigStore,
  MSSQLConfigStore,
  MySQLConfigStore,
  NoopConfigStore,
  PostgreSQLConfigStore,
  SQLiteConfigStore,
  LaunchDarklyConfigStore,
  CloudBeesConfigStore,
  CsvFileConfigStore,
  TomlFileConfigStore,
  XmlFileConfigStore,
  EtcdConfigStore,
} from '@configu/node';
import { ConfigStore } from '@configu/ts';
import { type LiteralUnion } from 'type-fest';

export type StoreType = LiteralUnion<
  | 'noop'
  | 'in-memory'
  | 'configu'
  | 'json-file'
  | 'csv-file'
  | 'ini-file'
  | 'toml-file'
  | 'xml-file'
  | 'hashicorp-vault'
  | 'aws-parameter-store'
  | 'aws-secrets-manager'
  | 'azure-key-vault'
  | 'gcp-secret-manager'
  | 'kubernetes-secret'
  | 'sqlite'
  | 'mysql'
  | 'mariadb'
  | 'postgres'
  | 'cockroachdb'
  | 'mssql'
  | 'launch-darkly'
  | 'cloud-bees'
  | 'etcd',
  string
>;

type ConfigStoreCtor = new (configuration: any) => ConfigStore;
const TYPE_TO_STORE_CTOR: Record<StoreType, ConfigStoreCtor> = {
  noop: NoopConfigStore,
  'in-memory': InMemoryConfigStore,
  configu: ConfiguConfigStore,
  'json-file': JsonFileConfigStore,
  'ini-file': IniFileConfigStore,
  'csv-file': CsvFileConfigStore,
  'toml-file': TomlFileConfigStore,
  'xml-file': XmlFileConfigStore,
  'hashicorp-vault': HashiCorpVaultConfigStore,
  'aws-parameter-store': AWSParameterStoreConfigStore,
  'aws-secrets-manager': AWSSecretsManagerConfigStore,
  'azure-key-vault': AzureKeyVaultConfigStore,
  'gcp-secret-manager': GCPSecretManagerConfigStore,
  'kubernetes-secret': KubernetesSecretConfigStore,
  sqlite: SQLiteConfigStore,
  mysql: MySQLConfigStore,
  mariadb: MariaDBConfigStore,
  postgres: PostgreSQLConfigStore,
  cockroachdb: CockroachDBConfigStore,
  mssql: MSSQLConfigStore,
  'launch-darkly': LaunchDarklyConfigStore,
  'cloud-bees': CloudBeesConfigStore,
  etcd: EtcdConfigStore,
};

export const constructStore = (type: string, configuration: any): ConfigStore => {
  const StoreCtor = TYPE_TO_STORE_CTOR[type];
  if (!StoreCtor) {
    throw new Error(`unknown store type ${type}`);
  }
  return new StoreCtor(configuration);
};
