import { Log } from '../src/log';
class LogStorage {
  key: string;

  constructor() {
    this.key = 'LOG_FAIL_LIST';
  }

  set(value: Log[]) {
    const logs = this.get();
    logs.push(...value);
    localStorage.setItem(this.key, JSON.stringify(logs));
  }

  get() {
    const logs = localStorage.getItem(this.key);
    return logs ? JSON.parse(logs) : [];
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

export const logStorage = new LogStorage();
