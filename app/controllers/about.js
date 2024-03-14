import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AboutController extends Controller {
  @action
  throwUp() {
    throw new Error('this is bad!');
  }

  async failingFetchCaught() {
    try {
      await fetch('https://sentry.relar2.ch/movies.json');
    } catch (error) {
      console.error("Caught async fetch issue with console error", error);
    }
  }

  async failingFetchUncaught() {
    await fetch('https://sentry.relar2.ch/movies.json');
  }
}
