/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const paths = require('./paths');

const buildIndexHTML = (headTags, bodyTags, options, swSourceFilepath, mainSourceFilepath) => {
  const html = fs.readFileSync(`${paths.src}/ui/template.html`);
  return html.toString()
    .replace('<%= headTags %>', headTags)
    .replace('<%= htmlWebpackPlugin.options.title %>', options.title)
    .replace('<%= swSourceFilepath %>', swSourceFilepath)
    .replace('<%= mainSourceFilepath %>', mainSourceFilepath)
    .replace('<%= bodyTags %>', bodyTags);
};

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
      "VirtualTree": `${paths.src}/ui/VirtualTree`,
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
