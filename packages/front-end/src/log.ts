export class Log {
  action: string;
  params: Record<string, any>;
  constructor(action: string, params?: Record<string, any>) {
    this.action = action;
    this.params = params || {};
  }

  addContent(key: string, value: any) {
    this.params[key] = value;
  }

  toJson() {
    return {
      action: this.action,
      params: JSON.stringify(this.params),
    };
  }
}
