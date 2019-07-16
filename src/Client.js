const axios = require('axios');

class Client {
  constructor(options) {
    this.services = new Map();

    Object.entries(options.services).forEach(([name, url]) => {
      this.services.set(name, url);
    });
  }

  async ask(name, params) {
    const [service, method] = name.split('.');
    const url = this.services.get(service);

    if (!url) {
      throw new Error('Service is not found');
    }

    const { data } = await axios.post(`http://${url}`, {
      jsonrpc: '2.0',
      method,
      params: params.params ? params.params : params,
      id: params.params && params.id,
    });

    return {
      error: data.error,
      result: data.result,
    };
  }
}

module.exports = Client;
