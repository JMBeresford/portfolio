const glslLoader = require('craco-glslify-loader');

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    return devServerConfig;
  },
  plugins: [
    {
      plugin: glslLoader,
      options: { test: /\.(glsl|vs|fs|vert|frag)$/ },
    },
  ],
};
