import * as _ from 'lodash';
import Policy from './Policy';
import Statement from './Statement';

export default class Role {
  name: string;
  description: string;
  policies: Policy[];
  private _statements: Statement[];

  constructor(name: string, policies: Policy[], description?: string) {
    this.description = description || name;
    this.name = name;
    this.policies = policies;
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
