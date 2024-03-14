'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-terser': {
      enabled: true,
    },
    minifyCSS: {
      enabled: true,
    },
    sourcemaps: {
      enabled: true,
    },
  });

  return app.toTree();
};
