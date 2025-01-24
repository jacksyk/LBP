import dayjs from 'dayjs';

export class Log {
  time: string;
  action: string;
  params: Record<string, any>;
  constructor(action: string, params?: Record<string, any>) {
    this.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
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
      formatTime: this.time,
    };
  }
}
