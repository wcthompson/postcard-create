'use strict';

var expect  = require('chai').expect;
var Angular = require('angular');
var Sinon   = require('sinon');

require('angular-mocks');

describe('run', function () {

  var $rootScope;
  var $state;
  var Session;

  beforeEach(Angular.mock.inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $state     = $injector.get('$state');
    Session    = $injector.get('Session');
  }));

  describe('stateChangeStart', function () {

    it('fails if going to authenticated route when not signed in', function () {
      Session.user = {};

      $state.go('home')
      .catch(function (err) {
        expect(err.message).to.eql('transition prevented');
      });

      $rootScope.$apply();
    });

    it('does not redirect if going to authenticated route when signed in', function () {
      var state = 'home';

      Sinon.stub(Session, 'token').returns(true);

      $state.go(state)
      .then(function () {
        expect($state.current.name).to.eql(state);
      });

      $rootScope.$apply();
    });

    it('does not redirect if going to unauthenticated route', function () {
      var state = 'login';
      Session.user = {};

      $state.go(state)
      .then(function () {
        expect($state.current.name).to.eql(state);
      });

      $rootScope.$apply();
    });

  });

});
