// 导入express
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
dotenv.config();

import { execute } from '../database/pool.js';

type logsBodyType = {
  logs: Array<{
    action: string;
    params: Record<string, any>;
    time: typeof Date.now;
  }>;
};

// 创建Web服务器
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** 获取日志接口 */
app.get('/logs', async (req, res) => {
  const sql = 'select * from logs';
  const result = await execute(sql);
  res.status(200).json({
    data: result,
  });
});

/** 增加日志接口 */
app.post('/logs', (req, res) => {
  const { body } = req;
  const { logs } = body as logsBodyType;

  for (const log of logs) {
    const { action, params } = log;
    const sql = `insert into logs (action, params, time) values (?,?,?)`;

    execute(sql, [action, params, new Date()]);
  }

  res.status(200).json({
    data: 'success',
  });
});

// 监听服务器
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
