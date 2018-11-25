import * as _ from 'lodash';
import Action, { getAction } from './Action';
import Resource from './Resource';
import Role from './Role';
import Statement from './Statement';

export default class Subject {
  name: string;
  roles: Role[];
  _statements: Statement[] | null;

  constructor(name: string, roles: Role[]) {
    this.name = name;
    this.roles = roles;
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

  can(action: Action | string, resource: Resource): boolean {
    action = typeof action === 'string' ? getAction(action) : action;
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
