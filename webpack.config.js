module.exports = {
  entry: './src/index.jsx',
  externals: {
    'react': 'react', 
    'react-dom' : 'react-dom',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
				],
			},
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    filename: 'bundle.js' ,
    libraryTarget: 'umd',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist'
  }
};