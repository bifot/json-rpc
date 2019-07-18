module.exports = (options) => {
  options = Object.assign({}, options);

  if (options.retries || options.retryDelay) {
    const retryDelay = options.retryDelay;

    options['axios-retry'] = {
      retries: options.retries,
      retryDelay: typeof retryDelay === 'function' ? retryDelay : () => retryDelay,
    };

    delete options.retries;
    delete options.retryDelay;
  }

  return options;
};
