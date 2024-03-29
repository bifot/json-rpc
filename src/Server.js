const http = require('http');
const parse = require('co-body');
const Context = require('./Context');
const { formatResponse } = require('./helpers');

class Server {
  constructor(options = {}) {
    this.options = options;
    this.middlewares = [];
  }

  on(...args) {
    return this.use(...args);
  }

  use(...args) {
    let method;

    if (typeof args[0] === 'string') {
      method = args.shift();
    }

    args.forEach((middleware) => {
      const index = this.middlewares.length;

      this.middlewares.push({
        method,
        handler: (ctx) => middleware(ctx, () => this.next(ctx, index + 1)),
      })
    });

    return this;
  }

  next(ctx, index = 0) {
    const middleware = this.middlewares[index];

    if (!middleware) {
      return;
    }

    const { method, handler } = middleware;

    if (!method || method === ctx.method) {
      return handler(ctx);
    }

    return this.next(ctx, index + 1);
  }

  listen(port) {
    return http.createServer(async (req, res) => {
      const body = await parse.json(req, this.options.body);

      if (body.jsonrpc !== '2.0') {
        return;
      }

      const context = new Context(body);

      await this.next(context);

      res.end(formatResponse(context));
    }).listen(port);
  }
}

module.exports = Server;
