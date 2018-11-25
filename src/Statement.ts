import * as _ from 'lodash';
import Action, { getAction } from './Action';
import Resource from './Resource';

export default class Statement {
  action: Action;
  allow: boolean;
  resource: Resource;

  constructor(
    action: Action | string,
    resource: Resource,
    allow: boolean = true
  ) {
    this.action = typeof action === 'string' ? getAction(action) : action;
    this.allow = allow;
    this.resource = resource;
  }
}
