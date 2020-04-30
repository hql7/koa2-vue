const Koa = require('koa');
const app = new Koa()
const Router = require('koa-router');
const router = new Router()
let cors = require('koa2-cors');
let fs = require('fs')

// 设置跨域
app.use(cors({
  origin: function (ctx) {
    return ctx.header.origin
  }, // 允许发来请求的域名
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的 HTTP请求方法
  credentials: true, // 标示该响应是合法的
}));

router.get('/getjson/:id', async (ctx, next) => {
  await next();
  let _id = ctx.params.id;
  let _data = JSON.parse(fs.readFileSync('./data/demo.json'));
  if (_id) {
    _data = _data.filter(i => i.id == _id)
  }
  let _res = {
    message: '请求成功',
    code: 200,
    data: _data
  }
  ctx.body = _res;
});

app.use(router.routes());
app.listen(3333)