const { expect } = require('chai');
const { Client } = require('../src');
const server = require('../examples/server');

describe('api', () => {
  let client;

  it('should create client', () => {
    client = new Client({
      services: {
        users: process.env.USERS_ADDRESS,
      },
    });

    expect(client.services).to.be.a('map');
    expect(client.services.get('users')).to.be.equal(`http://${process.env.USERS_ADDRESS}`);
  });

  it('should get response', async () => {
    const user = await client.ask('users.get', {
      age: 20,
    });

    expect(user).to.be.deep.equal({
      error: undefined,
      result: {
        name: 'Mikhail Semin',
        age: 20,
      },
    });
  });

  it('should get error', async () => {
    const user = await client.ask('users.get', {
      age: 10,
    });

    expect(user).to.be.deep.equal({
      error: {
        code: 400,
        message: 'Invalid age',
      },
      result: undefined,
    });
  });

  it('should get response after retries', async () => {
    server.close();

    setTimeout(() => {
      server.listen(process.env.APP_PORT);
    }, 1000);

    const user = await client.ask('users.get', {
      age: 10,
    }, {
      retries: 5,
      retryDelay: 500,
    });

    expect(user).to.be.deep.equal({
      error: {
        code: 400,
        message: 'Invalid age',
      },
      result: undefined,
    });
  });

  it('should get mock response', async () => {
    const response = {
      error: {
        code: 500,
        message: 'Server error',
      },
      result: undefined,
    };

    server.close();

    client.mock({
      users: {
        get: response,
      },
    });

    const user = await client.ask('users.get');

    expect(user).to.be.deep.equal(response);
  });
});
