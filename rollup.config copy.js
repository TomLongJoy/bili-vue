
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import nodeResolve   from '@rollup/plugin-node-resolve' // 解析第三方插件
import path from 'path' // 处理路径

import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
// 2.获取文件路径
let packagesDir = path.resolve(__dirname, 'packages');
//2.1 获取需要打包的包
let packageDir = path.resolve(packagesDir, process.env.TARGET);
//2.2打包获取到 每个包的项目配置
const resolve = (/** @type {string} */ p) => path.resolve(packageDir, p)// 获取到每个包的项目配置
const pkg = require(resolve(`package.json`))// 获取json 配置
const packageOptions = pkg.buildOptions || {}
const name = packageOptions.filename || path.basename(packageDir)
const outputOptions = {
    "esm-bundler": {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: 'es'
    },
    "cjs": {
        file: resolve(`dist/${name}.cjs.js`),
        format: 'es'
    },
    "global": {
        file: resolve(`dist/${name}.global.js`),
        format: 'iife'
    },
}
const options = pkg.buildOptions
function createConfig(format, output) {
    //  进行打包
    let _output = {
        ...output,
        name: options.name,
        sourcemap: !!process.env.SOURCE_MAP,
    }
    // console.log("_output", _output)
    // 生成 rollup 配置
    return {
        input: resolve('src/index.ts'),
        output: _output,
        moduleName: options.name,
        plugin: [
            json(),
            ts({
                tsconfig: path.resolve(__dirname, "tsconfig.json"),
            }),
            nodeResolve(),
        ]
    }
}
console.log("eee");

// rollup 需要导出一个配置
export default options.formats.map(format => createConfig(format, outputOptions))