import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AboutController extends Controller {
  @action
  throwUp() {
    throw new Error('this is bad!');
  }
}
