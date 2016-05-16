'use strict';

var Angular = require('angular');
var Router  = require('angular-ui-router');

var Config = require('./config');
var Home   = require('./home');

require('./styles');

module.exports = Angular.module('postcard-create', [
  Home,
  Router
])
.config(Config)
.name;
