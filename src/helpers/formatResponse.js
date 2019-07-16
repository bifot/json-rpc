module.exports = context => JSON.stringify({
  jsonrpc: '2.0',
  result: context.body,
  error: context.error,
  id: context.id,
});
