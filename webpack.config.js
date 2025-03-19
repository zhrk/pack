const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { PORT } = require('./config.ts');

const extensions = ['.tsx', '.ts', '.js'];

// Реколор свг с помощью плагина convertColors, подробнее в видео про webpack от ulbitv
// hot reload + state
// https://github.com/Siilwyn/css-declaration-sorter сортировка css

module.exports = (_, argv) => {
  const isDev = argv.mode !== 'production';
  const cwd = process.cwd();

  let plugins = [
    new HtmlWebpackPlugin({ template: path.join(cwd, 'public', 'index.html') }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '',
          globOptions: { ignore: ['**/index.html'] },
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
  ];

  if (isDev) {
    plugins = [
      ...plugins,
      new ESLintPlugin({ extensions, emitWarning: false }),
      new StylelintPlugin(),
      new ForkTsCheckerWebpackPlugin({ typescript: { memoryLimit: 8192 } }),
    ];
  }

  return {
    entry: path.resolve(cwd, 'src/index.tsx'),
    output: {
      filename: '[contenthash].[name].js',
      path: path.resolve(cwd, 'build'),
      publicPath: '/',
    },
    stats: 'minimal',
    devtool: 'source-map',
    infrastructureLogging: { level: 'info' },
    devServer: {
      port: PORT,
      open: true,
      hot: true,
      compress: false,
      historyApiFallback: true,
      static: { publicPath: '/' },
      client: { logging: 'warn' },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'ts-loader',
              options: { transpileOnly: true },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }],
        },
        {
          test: /\.scss$/,
          use: [
            isDev ? 'style-loader' : { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  namedExport: false,
                  exportLocalsConvention: 'as-is',
                  localIdentName: '[local]_[hash:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: { postcssOptions: { plugins: [['autoprefixer']] } },
            },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.svg$/,
          issuer: /\.tsx$/,
          use: [{ loader: '@svgr/webpack', options: { ref: true, icon: true } }],
        },
      ],
    },
    resolve: { extensions },
    plugins,
  };
};
