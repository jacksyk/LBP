import mysql from 'mysql2/promise';

// 创建连接池
const pool = mysql.createPool({
  host: 'localhost',
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
