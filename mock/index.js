const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const controller = require('./middleware/controller');


const app = new Koa();

// cors默认
// https://github.com/koajs/cors
app.use(cors());

app.use(bodyParser());


// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  // ctx.set('Content-Type', 'application/json');
  // ctx.set('Access-Control-Allow-Origin', '*');
  // ctx.set('Access-Control-Allow-Headers', 'Content-Type,Access-Control-Allow-Headers,Content-Length,Accept,Authorization,X-Requested-With');
  // ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH');
  // ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('X-Response-Time', `${ms}ms`);
});



// add router middleware:
app.use(controller());

app.listen(3000);
app.on('error', err => {
  log.error('server error', err)
});

console.log(`server run at http://localhost:3000`);