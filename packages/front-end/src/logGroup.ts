import { Log } from './log';
import { logStorage } from '../utils/logStorage';
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

  // 上传成功后清空埋点
  publish() {
    return new Promise((resolve, reject) => {
      console.log(this.logs);
      fetch(this.url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logs: [...this.logs, ...logStorage.get()],
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
          this.logs = [];
          logStorage.clear();
        })
        .catch((error) => {
          logStorage.set(this.logs);
          reject(error);
        });
    });
  }
}
