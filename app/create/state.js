'use strict'

var HTML = require('../views/create.html');

module.exports = function ($stateProvider) {

  $stateProvider.state('create', {
    url: '/create',
    controller: 'CreateCtrl',
    template: HTML,
    data: {
      authenticated: true
    }
  });

};
