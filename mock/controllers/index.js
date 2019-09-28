const POST_login= async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.response.body = `<h1>Welcome!</h1>`;
}

const GET_helloname = async(ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
}

const GET_root = async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
}

module.exports = {
  'POST /v1/login': POST_login,
  'GET /hello/:name': GET_helloname,
  'GET /':GET_root
};
