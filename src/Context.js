const assert = require('http-assert');

class Context {
  constructor(body) {
    this.version = body.jsonrpc;
    this.params = body.params;
    this.method = body.method;
    this.id = body.id;
  }

  assert(...args) {
    assert(...args);
  }
}

module.exports = Context;
