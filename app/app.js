import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'super-rentals/config/environment';
import * as Sentry from '@sentry/ember';
import { captureConsoleIntegration } from '@sentry/integrations';

Sentry.init({
  dsn: config.SENTRY_DSN,
  integrations: [captureConsoleIntegration({levels:['error']})],
});

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
