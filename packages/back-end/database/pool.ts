import mysql from 'mysql2/promise';
const NODE_ENV = process.env.NODE_ENV;
const host = NODE_ENV === 'development' ? '127.0.0.1' : 'db';
// 创建连接池
const pool = mysql.createPool({
  host, // 当使用 Docker Compose 时，Docker 会自动为所有服务创建一个内部网络，服务可以通过其服务名称相互访问
  user: 'root',
  password: 'kang',
  database: 'mysql',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 封装执行方法
export async function execute(sql: string, values?: any[]) {
  try {
    const [rows] = await pool.execute(sql, values);
    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

// 导出连接池以供直接使用
export default pool;
