'use strict';

var Angular = require('angular');
var Router  = require('angular-ui-router');

var State = require('./state');

module.exports = Angular.module('postcard-create.home', [
  Router
])
.config(State)
.name;
