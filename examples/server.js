const { Server } = require('../src');

const server = new Server();

server.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.error = {
      code: err.status || 500,
      message: err.message || 'Server error',
    };
  }
});

server.on('get', (ctx) => {
  ctx.assert(ctx.params.age >= 18, 400, 'Invalid age');

  ctx.body = {
    name: 'Mikhail Semin',
    age: ctx.params.age,
  };
});

module.exports = server.listen(process.env.APP_PORT);
