module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "./dist/main.js"
  },
  watch: true,
  module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
}