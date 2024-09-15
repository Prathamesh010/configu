const allExpressions = new Map<string, typeof Function>();

export class ConfiguExpressions {
  static register(name: string, fn: typeof Function) {
    allExpressions.set(name, fn);
  }

  static getOne(key: string) {
    return allExpressions.get(key);
  }

  static getAll() {
    const result: Record<string, typeof Function> = {};
    allExpressions.forEach((fn, name) => {
      result[name] = fn;
    });
    return result;
  }
}
