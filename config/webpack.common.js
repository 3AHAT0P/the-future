/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

const buildIndexHTML = (headTags, bodyTags, options, swSourceFilepath, mainSourceFilepath) => (
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    ${headTags}
    <title>
      ${options.title}
    </title>
  </head>

  <body>
    <div id="root">
      <!-- Instead ../public/images/example.png -->
      <!-- Вместо ../public/images/example.png -->
      <img src="./assets/images/example.png" />
      <script>window.__meta_sw_path = '${swSourceFilepath}'; window.__meta_main_path = '${mainSourceFilepath}';</script>
      ${bodyTags}
    </div>
  </body>
</html>`);

module.exports = {
  entry: {
    ui: `${paths.src}/ui/index.ts`,
    sw: `${paths.src}/service-worker/index.ts`,
    main: `${paths.src}/main/index.ts`,
  },
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: './',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Treee',
      favicon: `${paths.src}/ui/assets/images/favicon.png`,
      // template file
      // шаблон
      template: `${paths.src}/ui/template.html`,
      filename: 'index.html', // output file

      inject: false,
      templateContent: ({ htmlWebpackPlugin }) => {
        let swSourceFilepath = '';
        let mainSourceFilepath = '';

        const bodyTags = htmlWebpackPlugin.tags.bodyTags.filter((tag) => {
          if (/sw.*\.bundle\.js/i.test(tag.attributes.src)) {
            swSourceFilepath = tag.attributes.src;
            return false;
          }
          if (/main.*\.bundle\.js/i.test(tag.attributes.src)) {
            mainSourceFilepath = tag.attributes.src;
            return false;
          }
          return true;
        });

        return buildIndexHTML(
          htmlWebpackPlugin.tags.headTags,
          bodyTags,
          htmlWebpackPlugin.options,
          swSourceFilepath,
          mainSourceFilepath,
        );
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@/ui': `${paths.src}/ui/`,
      '@/api': `${paths.src}/service-worker/api/`,
      '@/main': `${paths.src}/main/`,
      '@/common': `${paths.src}/common/`,
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        include: [paths.src],
        loader: 'ts-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },

      // Images: Copy image files to build folder
      // Изображения: копировать файлы в директорию для файлов сборки
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      // Шрифты и SVG
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
};
