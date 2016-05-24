'use strict';

module.exports = function ($cookies, $state) {

  $cookies.remove('token');
  $cookies.remove('user');

  $state.go('login');

};
