/*
 * @Author:hewenke
 * @Date: 2020-05-27 10:08:53
 * @LastEditTime: 2020-05-27 11:04:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \smart_space_admin\vue.config.js
 */
const path = require('path')
const defaultSettings = require('./src/settings.js')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_TARGET_API, // 目标 API 地址
        changOrigin: true, // 跨域配置
        logLevel: 'debug',
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.entry.app = ['babel-polyfill', './src/main.js']
    config.plugins.delete('prefetch')
    if (process.env.NODE_ENV === 'production') {
      // 配置 gzip 压缩
      config.plugin('compressionPlugin').use(new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: true
      }))
    }
    // 代码分割
    config.when(
      process.env.NODE_ENV === 'production', // 配置生产环境生效
      config => {
        config.optimization.splitChunks({
          minSize: 30000, // 形成一个新代码块最小的体积
          minChunks: 1, // minChunks
          maxAsyncRequests: 5, // 按需加载时候最大的并行请求数。
          maxInitialRequests: 3, // 一个入口最大的并行请求数
          name: true,
          chunks: 'all', // 将对什么类型的代码进行分割，三种值：all: 全部 ｜ async: 异步，按需加载的代码 ｜ initial: 入口代码块
          cacheGroups: {
            // 缓存组
            // 定义 libs 缓存组，分割从 node_modules 中引入的代码
            libs: {
              name: 'chunk-libs', // 分割成的文件名
              test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 中模块
              priority: 10, // 优先级，当模块同时命中多个缓存组的规则时，分配到优先级高的缓存组
              chunks: 'initial' // 这里覆盖上面的 chunks: 'all'，仅打包最初依赖的第三方库
            },
            // 项目使用 iview 组件开发的，定义 iviewUI 缓存组，用于分割 iview 代码
            elementUI: {
              name: 'chunk-elmentUI',
              priority: 20, // 优先级 20，命中 iview 代码时，优先分割到此组里
              test: /[\\/]node_modules[\\/]_?element(.*)/ // 匹配 iview 代码
            }
          }
        })
      }
    )
    // // 图片压缩
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     disabled: true
    //   })
    config.plugin('html').tap(args => {
      args[0].title = name
      return args
    })

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  css: {
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     pxtoviewport({
      //       viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      //       // viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      //       unitPrecision: 3,
      //       // 指定`px`转换为视窗单位值的小数位数
      //       viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      //       selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      //       minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      //       mediaQuery: false // 允许在媒体查询中转换`px`
      //     })
      //   ]
      // },
      scss: {
        prependData: `@import "~@/styles/mixin.scss";`
      }
    }
  }
}
