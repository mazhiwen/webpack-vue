const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');


const app = new Koa();


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
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('X-Response-Time', `${ms}ms`);
});


// add url-route:
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
});
router.post('/v1/login', async (ctx, next) => {
  console.log(ctx);
  
  ctx.response.body = `<h1>Welcome!</h1>`;
});

app.use(bodyParser());

// add router middleware:
app.use(router.routes());

app.listen(3000);
app.on('error', err => {
  log.error('server error', err)
});

console.log(`server run at http://localhost:3000`);