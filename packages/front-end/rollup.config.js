import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

// 判断是否为生产环境
const isProd = process.env.NODE_ENV === 'production';

// 通用插件配置
const commonPlugins = [
  // 解析第三方依赖
  resolve(),
  // 将 CommonJS 转换为 ES Module
  commonjs(),
  // 支持 json 文件导入
  json(),
  // TypeScript 支持
  typescript({
    tsconfig: './tsconfig.json',
    sourceMap: !isProd,
    compilerOptions:{
      outDir:null,
      declaration:false
    }
  })
];

// 如果是生产环境，添加代码压缩
if (isProd) {
  commonPlugins.push(
    terser({
      format: {
        comments: false
      }
    })
  );
}

export default [
  // 主要构建配置
  {
    input: 'src/index.ts',
    output: [
      // ES Module 格式
      {
        dir: 'dist/esm',
        format: 'esm',
        preserveModules: true,
        sourcemap: !isProd
      },
      // CommonJS 格式
      {
        dir: 'dist/cjs',
        format: 'cjs',
        preserveModules: true,
        sourcemap: !isProd
      }
    ],
    plugins: commonPlugins,
    // 外部依赖，不会被打包
    external: [
      // 在这里添加不需要打包的依赖
      // 例如：'react', 'react-dom' 等
    ]
  },
  // 生成 .d.ts 类型文件
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];