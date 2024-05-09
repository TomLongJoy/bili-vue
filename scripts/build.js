//进行打包， monorepo 
//获取打包目录


import fs from "fs";
import execa from 'execa';

const dirs = fs.readdirSync('packages').filter(p => {
    if (!fs.statSync(`packages/${p}`).isDirectory()) {
        return false;
    }
    return true
})
//2.进行打包，并行打包
async function build(target) {
    console.log(target, "33333333333")
    //注意 execa , 用 rollup 打包，
    // -c 执行rollup（.config.js） 配置，
    // --environment 环境变量
    //target:${target}
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`], { stdio: 'inherit' })// stdio 子进程的输出在父包中输出
}

async function runParaller(dirs, itemFn) {
    //遍历
    let result = [];
    for (let item of dirs) {
        result.push(itemFn(item))
    }
    return Promise.all(result)//存放打包的promise，等待这里的打包执行完毕之后，调用成功。
}
runParaller(dirs, build).then(() => {// promise 
    console.log('全部打包完成')
})
//注意 文件夹才能打包
console.log(dirs)