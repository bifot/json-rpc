const { Client } = require('../src');

const client = new Client({
  services: {
    users: process.env.USERS_ADDRESS,
  },
});

module.exports = client;
