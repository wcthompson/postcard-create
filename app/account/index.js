'use strict';

var Angular = require('angular');

var Login  = require('./login');
var Logout = require('./logout');

module.exports = Angular.module('postcard-create.account', [
  Login,
  Logout
])
.name;
