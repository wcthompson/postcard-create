'use strict';

var Config = {
  development: require('./development'),
  production: require('./production'),
  test: require('./test')
};

/* istanbul ignore next */
module.exports = Config[process.env.NODE_ENV || 'development'];
