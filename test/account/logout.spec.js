'use strict';

var expect  = require('chai').expect;
var Angular = require('angular');

require('angular-mocks');

describe('logout controller', function () {

  var $controller;
  var $cookies;
  var $scope;
  var $state;

  beforeEach(Angular.mock.inject(function ($injector) {
    $controller = $injector.get('$controller');
    $cookies    = $injector.get('$cookies');
    $scope      = $injector.get('$rootScope').$new();
    $state      = $injector.get('$state');
  }));

  it('removes the token cookie', function () {
    $cookies.put('token', 'token');

    $controller('LogoutCtrl', { $scope: $scope, $state: $state });

    $scope.$apply();

    expect($cookies.get('token')).to.not.exist;
  });

  it('removes the user cookie', function () {
    $cookies.put('user', 'user');

    $controller('LogoutCtrl', { $scope: $scope, $state: $state });

    $scope.$apply();

    expect($cookies.get('user')).to.not.exist;
  });

});
