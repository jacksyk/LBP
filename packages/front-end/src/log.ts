import dayjs from 'dayjs';

export class Log {
  time: string;
  userId: string;
  action: string;
  params: Record<string, any>;
  constructor(userId: string, action: string, params: Record<string, any>) {
    this.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.userId = userId;
    this.action = action;
    this.params = params;
  }

  toJson() {
    return {
      userId: this.userId,
      action: this.action,
      params: Object.assign(this.params, {
        formatTime: this.time,
      }),
    };
  }
}
