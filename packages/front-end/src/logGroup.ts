import { Log } from './log';

/**
 * 负责收集日志，并处理发送逻辑
 */
export class LogGroup {
  logs: Log[];
  url: string;
  constructor(url: string) {
    this.logs = [];
    this.url = url;
  }

  addLog(log: Log) {
    this.logs.push(log);
  }

  publish() {
    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logs: this.logs,
        }),
      })
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    });
  }
}
