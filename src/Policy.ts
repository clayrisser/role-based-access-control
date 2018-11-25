import * as _ from 'lodash';
import Statement from './Statement';

export default class Policy {
  statements: Statement[] = [];
  name: string = '';
  description: string;

  constructor(name: string, statements: Statement[], description?: string) {
    this.description = description || name;
    this.name = name;
    this.statements = statements;
  }
}
