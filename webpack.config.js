var path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    jsx: [
      './CyViewer.jsx'
    ],
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        include: /client/,
        use: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]'
        ]
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: 'style-loader!css'
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')}
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
    })
  ],
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    contentBase: './src',
    hot: true,
    port: 3000
  }
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ]
}
