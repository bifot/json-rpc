class Context {
  constructor(body) {
    this.version = body.jsonrpc;
    this.params = body.params;
    this.method = body.method;
    this.id = body.id;
  }
}

module.exports = Context;
