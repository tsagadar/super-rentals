'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const buildMode = EmberApp.env();

function isProductionBuild() {
  return buildMode === 'production';
}

module.exports = function (defaults) {
  // Only load .env file if not in production environment
  if (!isProductionBuild()) {
    require('dotenv').config();
  }

  const app = new EmberApp(defaults, {
    'ember-cli-terser': {
      enabled: true,
      hiddenSourceMap: true,
    },
    babel: {
      sourceMaps: 'inline',
    },
    sourcemaps: {
      enabled: true,
    },
  });

  return app.toTree();
};
