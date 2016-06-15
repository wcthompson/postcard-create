'use strict';

var Config = require('../config');

module.exports = function ($rootScope, $state, Session) {

  $rootScope.LOB_URL = Config.LOB_URL;
  $rootScope.Session = Session;

  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if (toState.data.authenticated && !Session.token()) {
      event.preventDefault();
      $state.go('login');
    }
  });

};
