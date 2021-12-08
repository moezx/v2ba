import { defineConfig } from 'umi'
import chainWebpack from './webpack'

const isProduction = process.env.NODE_ENV === 'production'
const isStandAlone = process.env.STANDALONE !== undefined
const gitVersion = process.env.GIT_VERSION
const jsDeliverHost = process.env.JS_DELIVER_HOST
console.log('isProduction:', isProduction)
console.log('isStandAlone:', isStandAlone)

export default defineConfig({
  publicPath: isProduction ? `${jsDeliverHost}${ isStandAlone ? 'standalone' : 'build' }-${gitVersion}/` : '/',
  hash: false,
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  history: {
    type: 'hash',
  },
  targets: {
    ie: 11,
  },
  title: false,
  ignoreMomentLocale: true,
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: false,
    baseSeparator: '-',
  },
  manifest: {
    basePath: '/',
  },
  dynamicImport: {
    loading: '@/components/Loading',
  },
  chainWebpack: isProduction ? chainWebpack : undefined,
  chunks: isProduction ? ['vendors', 'compoments', 'umi'] : undefined,
  headScripts:
    isProduction && isStandAlone
      ? [
          {
            src: '/env.js',
          },
        ]
      : undefined,
  define: {
    'process.env.STANDALONE': process.env.STANDALONE,
    'process.env.VERSION': '1.4.0',
    'process.env.CURRENCY_LOCALE': process.env.CURRENCY_LOCALE ?? 'zh-CN',
    'process.env.CURRENCY_UNIT': process.env.CURRENCY_UNIT ?? 'CNY',
    'process.env.CURRENCY_MAX_DIGITS': 2,
    'process.env.GIT_VERSION': process.env.GIT_VERSION,
    'process.env.JS_DELIVER_HOST': process.env.JS_DELIVER_HOST,
  },
})
