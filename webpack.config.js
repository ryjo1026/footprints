const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/App.jsx',
  output: {
    path: path.join(__dirname, '/build/static/js/'),
    publicPath: '/static/js/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    watchOptions: {
      poll: true,
    },
    contentBase: path.join(__dirname, 'build'),
    publicPath: '/static/js/',
    compress: true,
    port: 9000,
  },
};
