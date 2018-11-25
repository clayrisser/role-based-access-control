import * as _ from 'lodash';
import Policy from './Policy';
import Statement from './Statement';

export default class Role {
  description: string;
  private _statements: Statement[];

  constructor(
    public name: string,
    public policies: Policy[],
    description?: string
  ) {
    this.description = description || name;
  }

  get statements(): Statement[] {
    if (this._statements) return this._statements;
    this._statements = _.uniqWith(
      _.reduce(
        this.policies,
        (statements: Statement[], policy: Policy) => {
          _.map(policy.statements, (statement: Statement) => {
            statements.push(statement);
          });
          return statements;
        },
        []
      ),
      _.isEqual
    );
    return this._statements;
  }
}
