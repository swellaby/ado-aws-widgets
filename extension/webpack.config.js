const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const getConfig = (name) => ({
  entry: `./src/app/${name}-entry.ts`,
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: `${name}.js`,
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `./src/templates/${name.split('-')[1]}.html`
      })
    ]
});



module.exports = [
  getConfig('cloudwatch-widget'),
  getConfig('cloudwatch-config'),
];
