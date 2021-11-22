const path = require('path');

module.exports = {
  output : {
    path: path.join(__dirname, 'dist'),
    filename: 'index.bundle.js',

  },
  devServer: {
    port: 3010,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node-module/,
        use: {
          loader: 'babel-loader'
        }
      }, 
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ],
  }
};