'use strict';

var HTML = require('../views/home.html');

module.exports = function ($stateProvider) {

  $stateProvider.state('home', {
    url: '/',
    template: HTML,
    data: {
      authenticated: true
    }
  });

};
