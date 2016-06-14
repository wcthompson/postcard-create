'use strict';

var Angular = require('angular');

require('angular-mocks');

beforeEach(Angular.mock.module(require('../')));

var $cookies;
var $httpBackend;

beforeEach(Angular.mock.inject(function ($injector) {
  $cookies     = $injector.get('$cookies');
  $httpBackend = $injector.get('$httpBackend');
}));

afterEach(function () {
  var cookies = $cookies.getAll();
  for (var key in cookies) {
    $cookies.remove(key);
  }
});

afterEach(function () {
  $httpBackend.verifyNoOutstandingExpectation();
  $httpBackend.verifyNoOutstandingRequest();
});
