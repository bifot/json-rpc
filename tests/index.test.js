const { expect } = require('chai');
const client = require('../examples/client');
const server = require('../examples/server');

it('should get response', async () => {
  const user = await client.ask('users.get', {
    age: 16,
  });

  expect(response).to.be.deep.equal({
    error: undefined,
    response: {
      name: 'Mikhail Semin',
      age: 16,
    },
  });
});
