// 导入express
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import process from 'process'

dotenv.config()

import { query } from '../database/pool.js'

type logsBodyType = {
  action: string
  params: Record<string, any>
  time: typeof Date.now
}

// 创建Web服务器
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  console.log('正常启动')
  res.send('ok')
})

app.get('/logs', async (req, res) => {
  console.log('get>>>')
  const sql = 'select * from logs'
  const result = await query(sql)
  res.json({
    data: result
  })
})

app.post('/logs', (req, res) => {
  console.log('post>>>')
  const { body } = req
  const { action, params, time } = body as logsBodyType
  res.send('ok')
})

// 监听服务器
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`)
})
