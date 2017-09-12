const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
let config = require('./webpack.dev');
if(process.env.NODE_ENV === 'production') {
  config = require('./webpack.prod');
}
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.listen(3000, function() {
  console.log('啊啊啊啊啊五环~，我现在在3000环\n')
})