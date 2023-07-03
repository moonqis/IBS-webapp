const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',// 需要配置 否则打包后的apk文件安装在手机可能白屏
  // devServer: {

  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:3000/api',//后端接口地址
  //     changeOrigin: true,//是否允许跨越
  //     secure: false,
  //     pathRewrite: {
  //       '^/api': '/api'//重写,
  //     }
  //   }
  // }
  // }

})
