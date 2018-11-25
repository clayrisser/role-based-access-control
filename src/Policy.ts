import * as _ from 'lodash';
import Statement from './Statement';

export default class Policy {
  description: string;

  constructor(
    public name: string,
    public statements: Statement[],
    description?: string
  ) {
    this.description = description || name;
  }
}
