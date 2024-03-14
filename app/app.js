import Application from '@ember/application';
import Resolver from 'ember-resolver';
import Ember from 'ember';
import loadInitializers from 'ember-load-initializers';
import config from 'super-rentals/config/environment';
import * as Sentry from '@sentry/ember';
import { captureConsoleIntegration } from '@sentry/integrations';
import sdkFingerprinting from 'super-rentals/utils/sentry';

Sentry.init({
  debug: true,
  integrations: [captureConsoleIntegration({levels:['error']})],
  ignoreErrors: [
    'TransitionAborted',
    // Occurs when user puts app in the background while network requests are ongoing. Nothing we could do.
    'The adapter operation was aborted',
    // avoid reporting raw bridge exception - it might be caught further upstream
    /^bridge-error/,
    // avoid reporting exception if it potentially gets handled in error sub-state
    /^Error while processing route/,
    // Occurs when lona map gets destroyed while some async processing is still happening
    /\[promiseForEvent]: map removed, aborting/,
  ],
  environment: 'live',
  beforeSend(event, hint) {
    // set custom fingerprint if required
    return sdkFingerprinting(event, hint);
  },
});

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

Ember.onerror = (error) => {
  // see https://git.io/vbine
  if (Ember.testing) {
    throw error;
  }
  Sentry.captureException(error);
  console.warn(error); // eslint-disable-line no-console
};

loadInitializers(App, config.modulePrefix);
