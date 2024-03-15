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

  const prependUrl = "https://sentry.relar.ch/"

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
    publicAssetURL: prependUrl,
    fingerprint: {
      enabled: isProductionBuild(),
      prepend: prependUrl,
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'pdf', 'woff', 'svg', 'json', 'mp4'],
      generateAssetMap: true,
      fingerprintAssetMap: true,
    },
  });

  return app.toTree();
};
