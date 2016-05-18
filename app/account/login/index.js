'use strict';

var Angular = require('angular');
var Cookies = require('angular-cookies');
var Router  = require('angular-ui-router');

var Controller = require('./controller');
var State      = require('./state');

module.exports = Angular.module('postcard-create.account.login', [
  Cookies,
  Router
])
.controller('LoginCtrl', Controller)
.config(State)
.name;
