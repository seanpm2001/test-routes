'use strict';
var compress = require('koa-compress');
var logger = require('koa-logger');
var router = require('koa-router');
var koaBody = require('koa-body');
var koa = require('koa');
var app = module.exports = koa();
var cors = require('koa-cors');

// Logger
app.use(logger());

app.use(cors());
app.use(router(app));

app.get('/hello', function *() {
  this.body = {message: 'Thanks for using Thinkster, you\'re awesome ;)'};
});

app.post('/uppercase', koaBody(), function *() {

  let msg = this.request.body.message;

  if(msg) {
    msg = msg.toUpperCase();
  } else {
    msg = 'PLZ SPECIFY A MESSAGE!';
  }
  this.body = {message: msg};
});


// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3002);
  console.log('listening on port 3002');
}