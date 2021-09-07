import { resolve } from 'path';
import { defineConfig } from 'umi';
import routes from './config/router';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  hash: true,
  title: '艺术的成分',
  dll: false,
  dva: { skipModelValidate: true },
  routes: routes,
  targets: {
    chrome: 60,
  },
  define: {
    API_PREFIX: '',
  },
  alias: {
    '@': resolve(__dirname, './src/'),
  },
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    localsConvention: 'camelCase',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ],
  fastRefresh: {},
});
