'use strict';

var Istanbul = require('browserify-istanbul');

module.exports = function (config) {
  config.set({
    frameworks: ['browserify', 'mocha'],
    files: [
      'test/**/*.spec.js'
    ],
    preprocessors: {
      'test/**/*.spec.js': 'browserify'
    },
    browserify: {
      debug: true,
      configure: function (bundle) {
        bundle.on('prebundle', function () {
          bundle.transform(Istanbul, {
            ignore: [
              '**/views/**',
              '**/styles/**',
              '**/public/**',
              '**/vendor/**'
            ]
          });
        });
      }
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'html' },
        { type: 'json' },
        { type: 'text-summary' }
      ],
      dir: './coverage',
      subdir: './lcov-report'
    },
    browserNoActivityTimeout: 20000,
    browsers: ['Chrome']
  });
};
