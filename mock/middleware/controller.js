const fs = require('fs');
const path = require('path');


// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
function addMapping(router, mapping) {
  for (const url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}
console.log(path.resolve(__dirname, '../controllers'));
function addControllers(router) {
  const files = fs.readdirSync(path.resolve(__dirname, '../controllers'));
  const js_files = files.filter(f => f.endsWith('.js'));
  for (const f of js_files) {
    // console.log(`process controller: ${f}...`);
    const mapping = require(`${path.resolve(__dirname, '../controllers')}/${f}`);
    addMapping(router, mapping);
  }
}

module.exports = function (dir) {
  const
    controllers_dir = dir || 'controllers'; // 如果不传参数，扫描目录默认为'controllers'
  const router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};
