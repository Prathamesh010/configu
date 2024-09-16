const allStores = new Map();

export class ConfiguStores {
  static register(name: string, store: any) {
    allStores.set(name, store);
  }

  // eslint-disable-next-line consistent-return
  static getOne(key: string) {
    const store = allStores.get(key);
    if (store) {
      return store;
    }
    if (!store) {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      require(`../../deferred-integrations/dist/${key}.js`);
      return allStores.get(key);
    }
  }
}
