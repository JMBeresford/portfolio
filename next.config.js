const plugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withOffline = require('next-offline');

const nextConfig = {
  webpack(config, { isServer }) {
    // audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });

    // font support
    config.module.rules.push({
      test: /\.(ttf|otf)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/fonts/`,
            outputPath: `${isServer ? '../' : ''}static/fonts/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });

    // 3D model support
    config.module.rules.push({
      test: /\.(obj|mtl|glb|gltf)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/models/`,
            outputPath: `${isServer ? '../' : ''}static/models/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },
};

// manage i18n
if (process.env.EXPORT !== 'true') {
  nextConfig.i18n = {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  };
}

module.exports = plugins(
  [
    [
      withOffline,
      {
        workboxOpts: {
          swDest: process.env.NEXT_EXPORT
            ? 'service-worker.js'
            : 'static/service-worker.js',
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'offlineCache',
                expiration: {
                  maxEntries: 200,
                },
              },
            },
          ],
        },
        async rewrites() {
          return [
            {
              source: '/service-worker.js',
              destination: '/_next/static/service-worker.js',
            },
          ];
        },
      },
    ],
    withBundleAnalyzer,
  ],
  nextConfig
);
