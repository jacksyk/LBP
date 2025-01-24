import { Log } from './log';

export class LogGroup {
  logs: Log[];
  constructor() {
    this.logs = [];
  }

  addLog(log: Log) {
    this.logs.push(log);
  }

  publish() {
    fetch('http://localhost:3000/logs', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        logs: this.logs,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  }
}
