import { Log } from './log';
import { LogGroup } from './logGroup';

/**
 * 发布者
 * 负责将日志组发布到后端
 * 对外暴露一些参数
 */
export class Publisher {
  /** 接口域名地址 */
  url: string;
  /** 公共参数 */
  commonParams: Record<string, any>;
  /** 日志组 */
  logGroup: LogGroup;

  constructor(url: string) {
    this.url = url;
    this.commonParams = {};
    this.logGroup = new LogGroup('http://localhost:3000/logs');
  }

  /** 设置公参 */
  setCommonParams(params: Record<string, any>) {
    Object.assign(this.commonParams, params);
  }

  /** 发送事件 */
  sendEventLog(event: string, params?: Record<string, any>) {
    if (typeof params === 'object') {
      Object.assign(params, this.commonParams);
    }
    const log = new Log(event, params);
    this.logGroup.addLog(log);
    this.logGroup.publish();
  }
}
