const { Client } = require('../src');

const client = new Client({
  services: {
    users: process.env.USERS_ADDRESS,
  },
});

void async function() {
  const user = await client.ask('users.get', {
    age: 16,
  });

  console.log(user);
}();
