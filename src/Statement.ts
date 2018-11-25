import * as _ from 'lodash';
import Action, { getAction } from './Action';
import Resource from './Resource';

export default class Statement {
  action: Action;

  constructor(
    action: Action | string,
    public resource: Resource,
    public allow: boolean = true
  ) {
    this.action = typeof action === 'string' ? getAction(action) : action;
  }
}
