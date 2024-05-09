//进行打包， monorepo 
//获取打包目录
import execa from 'execa';
//2.进行打包，并行打包
async function build(target) {
    console.log(target, "33333333333")
    //注意 execa , 用 rollup 打包，
    // -c 执行rollup（.config.js） 配置，
    // --environment 环境变量
    //target:${target}
    //-w 自动监听
    await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], { stdio: 'inherit' })// stdio 子进程的输出在父包中输出
}

build('reactivity')