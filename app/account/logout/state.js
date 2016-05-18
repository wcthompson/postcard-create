'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
  .state('logout', {
    url: '/logout',
    template: '<div></div>',
    controller: 'LogoutCtrl',
    data: {
      authenticated: true
    }
  });
};
