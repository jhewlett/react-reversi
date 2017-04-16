module.exports = {
  entry: './js/App.js',
  output: {
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel' }]
  }
};
