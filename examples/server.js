const { Server } = require('../src');

const server = new Server();

server.on((ctx) => {
  if (ctx.params.age < 18) {
    ctx.error = {
      code: 400,
      message: 'Invalid age',
    };

    return;
  }

  ctx.body = {
    name: 'Mikhail Semin',
    age: ctx.params.age,
  };
});

module.exports = server.listen(process.env.APP_PORT);
