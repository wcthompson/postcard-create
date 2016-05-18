'use strict';

module.exports = function ($rootScope, $state, Session) {

  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if (toState.data.authenticated && !Session.token()) {
      event.preventDefault();
      $state.go('login');
    }
  });

};
