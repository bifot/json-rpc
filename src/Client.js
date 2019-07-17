const axios = require('axios');

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

  async ask(name, params, options) {
    const [service, method] = name.split('.');
    const url = this.services.get(service);

    if (!url) {
      throw new Error('Service is not found');
    }

    try {
      const { data } = await axios.post(url, {
        jsonrpc: '2.0',
        method,
        params: params.params ? params.params : params,
        id: params.params && params.id,
      }, options);

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
