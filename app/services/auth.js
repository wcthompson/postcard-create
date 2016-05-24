'use strict';

var Config = require('../../config');

module.exports = function (API) {

  var Auth = {};

  Auth.login = function (user) {
    return API.post(Config.API_HOST + '/auth/login', user);
  };

  return Auth;

};
