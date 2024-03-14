'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'super-rentals',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      RAISE_ON_DEPRECATION: true,
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  ENV.MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

  const dsn = process.env.SENTRY_DSN;
  const release = `super-rentals-${new Date().toISOString().slice(0, 19)}`;
  ENV['@sentry/ember'] = {
    ignoreEmberOnErrorWarning: true, // Will silence Ember.onError warning without the need of using Ember debugging tools. False by default.
    disablePerformance: true, // Will disable automatic instrumentation of performance. Manual instrumentation will still be sent.
    sentry: { dsn, release },
  };

  return ENV;
};
