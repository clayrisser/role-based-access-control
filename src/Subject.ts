import * as _ from 'lodash';
import Role from './Role';
import Statement from './Statement';

export default class Subject {
  description: string;
  _statements: Statement[] | null;

  constructor(public name: string, public roles: Role[], description?: string) {
    this.description = description || name;
  }

  get statements(): Statement[] {
    if (this._statements) return this._statements;
    this._statements = _.uniqWith(
      _.reduce(
        this.roles,
        (statements: Statement[], role: Role) => {
          _.map(role.statements, (statement: Statement) => {
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

  can({ action, resource }: Statement): boolean {
    return _.reduce(
      this.statements,
      (can: boolean, statement: Statement) => {
        return (
          can ||
          (action === statement.action &&
            resource === statement.resource &&
            statement.allow)
        );
      },
      false
    );
  }
}
