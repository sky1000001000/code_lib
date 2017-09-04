//导入Koa
const Koa = require('koa');

//创建一个Koa对象表示web app本身
const app = new Koa();
//对于任何请求，APP将调用该异步函数处理请求
//ctx封装了request和response对象
//next为下一个要封装的异步函数
app.use(async(ctx,next) => {
   await next();
   ctx.response.type = 'text/html';
   ctx.response.body = '<h1>Hello,koa2</h>';
});

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000');
