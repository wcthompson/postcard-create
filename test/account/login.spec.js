'use strict';

var expect  = require('chai').expect;
var Angular = require('angular');
var Sinon   = require('sinon');

require('angular-mocks');

var session = { token: 'banana', user: { id: 'user_id' } };
var error = { message: 'error message' };

describe('login controller', function () {

  var $controller;
  var $cookies;
  var $q;
  var $scope;
  var $state;
  var Auth;

  beforeEach(Angular.mock.inject(function ($injector) {
    $controller = $injector.get('$controller');
    $cookies    = $injector.get('$cookies');
    $q          = $injector.get('$q');
    $scope      = $injector.get('$rootScope').$new();
    $state      = $injector.get('$state');
    Auth        = $injector.get('Auth');
  }));

  describe('login', function () {

    beforeEach(function () {
      $controller('LoginCtrl', { $scope: $scope, $state: $state });

      $scope.$apply();
    });

    it('sets the token cookie', function () {
      Sinon.stub(Auth, 'login').returns($q.resolve(session));

      $scope.login({});

      $scope.$apply();

      expect($cookies.get('token')).to.eql(session.token);
    });

    it('sets the user cookie', function () {
      Sinon.stub(Auth, 'login').returns($q.resolve(session));

      $scope.login({});

      $scope.$apply();

      expect($cookies.getObject('user')).to.eql(session.user);
    });

    it('sets error if an error is returned', function () {
      Sinon.stub(Auth, 'login').returns($q.reject(error));

      $scope.login({});

      $scope.$apply();

      expect($scope.error).to.eql(error.message);
    });

  });

});
