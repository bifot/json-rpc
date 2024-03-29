const axios = require('axios');
const enableRetries = require('axios-retry');
const { buildOptions } = require('./helpers');

enableRetries(axios, {
  retries: 0,
});

class Client {
  constructor(options) {
    this.services = new Map();

    Object.entries(options.services).forEach(([name, url]) => {
      const hasProtocol = url.startsWith('https://') || url.startsWith('http://');

      this.services.set(
        name,
        hasProtocol ? url : `http://${url}`,
      );
    });
  }

  mock(responses) {
    this.responses = responses;

    return this;
  }

  async ask(name, params = {}, options = {}) {
    const [service, method] = name.split('.');
    const url = this.services.get(service);
    const mock = this.responses && this.responses[service] && this.responses[service][method];

    if (mock) {
      return typeof mock === 'function' ? mock(params) : mock;
    }

    if (!url) {
      throw new Error('Service is not found');
    }

    try {
      const { data } = await axios.post(url, {
        jsonrpc: '2.0',
        method,
        params: params.params ? params.params : params,
        id: params.params && params.id,
      }, buildOptions(options));

      return {
        error: data.error,
        result: data.result,
      };
    } catch (err) {
      return {
        error: err,
      };
    }
  }
}

module.exports = Client;
