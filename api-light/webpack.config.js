const path = require('path');
// eslint-disable-next-line import/no-unresolved
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.join(__dirname, '.webpack'),
  },
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        enforce: 'pre', // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        include: __dirname,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  externals: [{ 'aws-sdk': 'commonjs aws-sdk' }],
  resolve: {
    alias: {
      Middlewares: path.resolve(__dirname, 'src/app/middlewares/'),
      Errors: path.resolve(__dirname, 'src/app/errors/'),
      Constants: path.resolve(__dirname, 'src/app/constants/'),
      Repositories: path.resolve(__dirname, 'src/app/repositories/'),
    }
  }
};
