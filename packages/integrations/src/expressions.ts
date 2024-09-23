type ExpressionFunction = (...args: any[]) => unknown;
const allExpressions = new Map<string, ExpressionFunction>();

export class ConfiguExpressions {
  static register(name: string, fn: ExpressionFunction) {
    allExpressions.set(name, fn);
  }

  static getOne(key: string) {
    return allExpressions.get(key);
  }

  static getAll() {
    const result: Record<string, ExpressionFunction> = {};
    allExpressions.forEach((fn, name) => {
      result[name] = fn;
    });
    return result;
  }
}
