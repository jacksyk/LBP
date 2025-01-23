import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const config = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: './dist/index.js',
                format: 'es',
                sourcemap: false,
            }
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json'
            })
        ]
    },
    {
        input: "src/index.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        plugins: [dts()]
    }
]
export default config;