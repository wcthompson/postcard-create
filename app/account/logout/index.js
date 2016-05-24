'use strict';

var Angular = require('angular');
var Cookies = require('angular-cookies');
var Router  = require('angular-ui-router');

var Controller = require('./controller');
var State      = require('./state');

module.exports = Angular.module('postcard-create.account.logout', [
  Cookies,
  Router
])
.controller('LogoutCtrl', Controller)
.config(State)
.name;
