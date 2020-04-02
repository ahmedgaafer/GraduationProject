module.exports = {
  watch:true,
  watchOptions:{
    aggregateTimeout: 100,
    ignored: /node_modules/,
    poll: 2
  },
  module: {
    rules: [{ 
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },{
      test:/\.css$/,
      exclude: /node_modules/,
      use:[
        "style-loader",
        "css-loader"
      ]
    }]
  }
}