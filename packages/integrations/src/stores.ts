const allStores = new Map();

export class ConfiguStores {
  static register(name: string, store: any) {
    store.set(name, store);
  }

  static getOne(key: string) {
    return allStores.get(key);
  }
}
