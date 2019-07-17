const { expect } = require('chai');
const { Client } = require('../src');

require('../examples/server');

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
    })
  });
});
