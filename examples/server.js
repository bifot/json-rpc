const { Server } = require('../src');

const server = new Server();

server.on((ctx) => {
  ctx.body = {
    name: 'Mikhail Semin',
    age: ctx.params.age,
  };
});

module.exports = server.listen(process.env.APP_PORT);
