import * as _ from 'lodash';
import Action from './Action';
import Resource from './Resource';

export default class Statement {
  constructor(
    public action: Action,
    public resource: Resource,
    public allow: boolean = true
  ) {}
}
