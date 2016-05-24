'use strict';

var HTML = require('../../views/account/login.html');

module.exports = function ($stateProvider) {

  $stateProvider.state('login', {
    url: '/login',
    template: HTML,
    controller: 'LoginCtrl',
    data: {
      authenticated: false
    }
  });

};
