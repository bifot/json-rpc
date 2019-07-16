# @bifot/json-rpc

Solution for communication between services using HTTP protocol via JSON RPC. 🔬

## Install

```sh
$ npm i @bifot/json-rpc -S
```

## Usage

### Server

```js
const { Server } = require('@bifot/json-rpc');
const { Users } = require('../db');

const server = new Server();

server.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.error = {
      code: 500,
      message: 'Server error.',
    };
  }
});

server.on('get', async (ctx) => {
  ctx.body = await Users.findOne({
    id: ctx.params.id,
  });
});

server.listen(process.env.APP_PORT);
```

### Client

```js
const { Client } = require('@bifot/json-rpc');

const client = new Client({
  services: {
    users: process.env.USERS_ADDRESS,
  },
});

const user = await client.ask('users.get', {
  id: 10,
});

// {
//   error: undefined,
//   response: {
//     id: 10,
//     name: 'Mikhail Semin',
//     age: 16,
//   },
// }
```
