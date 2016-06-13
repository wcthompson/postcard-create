'use strict';

var expect  = require('chai').expect;
var Angular = require('angular');

require('angular-mocks');

describe('session service', function () {

  var $cookies;
  var Session;

  beforeEach(Angular.mock.inject(function ($injector) {
    $cookies = $injector.get('$cookies');
    Session  = $injector.get('Session');
  }));

  describe('token', function () {

    it('returns the token cookie', function () {
      var token = 'banana';

      $cookies.put('token', token);

      expect(Session.token()).to.eql(token);
    });

  });

  describe('user', function () {

    it('returns the parsed user cookie', function () {
      var user = { id: 'banana' };

      $cookies.putObject('user', user);

      expect(Session.user()).to.eql(user);
    });

    it('returns an empty object if there is no user cookie', function () {
      expect(Session.user()).to.eql({});
    });

  });

});
