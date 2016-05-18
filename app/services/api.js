'use strict';

var Angular = require('angular');

module.exports = function ($http, $q) {

  var API = {};

  API.createError = function (response) {
    var err;
    if (response.data && response.data.errors && response.data.errors[0]) {
      err = new Error(response.data.errors[0].message);
    } else if (response.data && response.data.error) {
      err = new Error(response.data.error.message);
    } else if (response.status === 504) {
      err = new Error('Request timed out. Please contact us at support@lob.com.');
    } else {
      err = new Error('Looks like something went wrong on our end. Please contact us at support@lob.com.');
    }
    return $q.reject(err);
  };

  API.get = function (url, params, timeout) {
    return $http.get(url, { params: params, timeout: timeout })
    .then(function (res) {
      return res.data;
    })
    .catch(this.createError);
  };

  API.post = function (url, params, options) {
    options = options || {};

    if (params instanceof FormData) {
      options.transformRequest = Angular.identity;
      options.headers = options.headers || {};
      Angular.merge(options.headers, { 'Content-Type': undefined });
    }

    return $http.post(url, params, options)
    .then(function (res) {
      return res.data;
    })
    .catch(this.createError);
  };

  return API;

};
