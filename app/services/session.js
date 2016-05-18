'use strict';

module.exports = function ($cookies) {

  var Session = {};

  Session.token = function () {
    return $cookies.get('token');
  };

  Session.user = function () {
    return $cookies.getObject('user') || {};
  };

  return Session;

};
