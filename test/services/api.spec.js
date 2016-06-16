'use strict';

var expect  = require('chai').expect;
var Angular = require('angular');
var Sinon   = require('sinon');

var TIMEOUT_MESSAGE = 'Request timed out. Please contact us at support@lob.com.';
var ERROR_MESSAGE   = 'Looks like something went wrong on our end. Please contact us at support@lob.com.';

require('angular-mocks');

describe('api service', function () {

  var $httpBackend;
  var $q;
  var $rootScope;
  var API;
  var Session;

  beforeEach(Angular.mock.inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $q           = $injector.get('$q');
    $rootScope   = $injector.get('$rootScope');
    API          = $injector.get('API');
    Session      = $injector.get('Session');
  }));

  describe('createError', function () {

    it('extracts an errors array on rejection', function () {
      var errorResponse = { data: { errors: [{ message: 'ResponseHandlers Test Err' }] } };

      $q.reject(errorResponse)
      .catch(API.createError)
      .catch(function (err) {
        expect(err.message).to.eql(errorResponse.data.errors[0].message);
      });

      $rootScope.$apply();
    });

    it('extracts an error on rejection', function () {
      var errorResponse = { data: { error: { message: 'ResponseHandlers Test Err' } } };

      $q.reject(errorResponse)
      .catch(API.createError)
      .catch(function (err) {
        expect(err.message).to.eql(errorResponse.data.error.message);
      });

      $rootScope.$apply();
    });

    it('rejects with a timeout error if 504', function () {
      var errorResponse = { status: 504 };

      $q.reject(errorResponse)
      .catch(API.createError)
      .catch(function (err) {
        expect(err.message).to.eql(TIMEOUT_MESSAGE);
      });

      $rootScope.$apply();
    });

    it('rejects with a generic error if no message', function () {
      var errorResponse = { status: 500 };

      $q.reject(errorResponse)
      .catch(API.createError)
      .catch(function (err) {
        expect(err.message).to.eql(ERROR_MESSAGE);
      });

      $rootScope.$apply();
    });

  });

  describe('get', function () {

    it('calls $http.get and unwraps the data', function () {
      var url = 'http://test.com';
      var response = { test: 'banana' };

      $httpBackend.expectGET(url).respond(200, response);

      API.get(url)
      .then(function (res) {
        expect(res).to.eql(response);
      });

      $httpBackend.flush();
    });

    it('adds the session token in the header if it exists', function () {
      var url = 'http://test.com';
      var response = { test: 'banana' };
      var token = 'token';

      Sinon.stub(Session, 'token').returns(token);

      $httpBackend.expect('GET', url, null, function (headers) {
        return headers.Authorization === 'Bearer ' + token;
      }).respond(200, response);

      API.get(url)
      .then(function (res) {
        expect(res).to.eql(response);
      });

      $httpBackend.flush();

      Session.token.restore();
    });

  });

  describe('post', function () {

    it('calls $http.post and unwraps the data', function () {
      var url = 'http://test.com';
      var params = { test: 'superbanana' };
      var response = { test: 'banana' };

      $httpBackend.expectPOST(url, params).respond(200, response);

      API.post(url, params)
      .then(function (res) {
        expect(res).to.eql(response);
      });

      $httpBackend.flush();
    });

    it('defaults headers with Content-Type if FormData', function () {
      var url = 'http://test.com';
      var params = new FormData();
      var response = { test: 'banana' };

      $httpBackend.expect('POST', url, new FormData(), function (headers) {
        return headers['Content-Type'] === undefined;
      }).respond(200, response);

      API.post(url, params)
      .then(function (res) {
        expect(res).to.eql(response);
      });

      $httpBackend.flush();
    });

    it('merges headers with Content-Type if FormData', function () {
      var url = 'http://test.com';
      var params = new FormData();
      var options = { headers: { test: 'header' } };
      var response = { test: 'banana' };

      $httpBackend.expect('POST', url, new FormData(), function (headers) {
        return headers.test === options.headers.test && headers['Content-Type'] === undefined;
      }).respond(200, response);

      API.post(url, params, options)
      .then(function (res) {
        expect(res).to.eql(response);
      });

      $httpBackend.flush();
    });

    it('adds the session token in the header if it exists', function () {
      var url = 'http://test.com';
      var response = { test: 'banana' };
      var token = 'token';

      Sinon.stub(Session, 'token').returns(token);

      $httpBackend.expect('POST', url, null, function (headers) {
        return headers.Authorization === 'Bearer ' + token;
      }).respond(200, response);

      API.post(url, null)
      .then(function (res) {
        expect(res).to.eql(response);
      });

      $httpBackend.flush();

      Session.token.restore();
    });

  });

});
