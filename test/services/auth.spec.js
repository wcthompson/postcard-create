'use strict';

var expect  = require('chai').expect;
var Angular = require('angular');
var Sinon   = require('sinon');

var Config = require('../../config');

require('angular-mocks');

describe('auth service', function () {

  var $q;
  var $rootScope;
  var API;
  var Auth;

  beforeEach(Angular.mock.inject(function ($injector) {
    $q         = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
    API        = $injector.get('API');
    Auth       = $injector.get('Auth');
  }));

  describe('login', function () {

    it('calls the correct endpoint and with correct params', function () {
      var user = { email: 'banana@lob.com' };

      Sinon.stub(API, 'post').returns($q.resolve());

      Auth.login(user);

      $rootScope.$apply();

      expect(API.post.firstCall.args[0]).to.eql(Config.API_HOST + '/auth/login');
      expect(API.post.firstCall.args[1]).to.eql(user);

      API.post.restore();
    });

  });

});
