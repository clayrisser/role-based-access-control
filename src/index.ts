// import * as _ from 'lodash';
// import { RouteEntry } from '@loopback/rest';
import Policy from './Policy';
import Role from './Role';
import Statement from './Statement';
import Subject from './Subject';
// import { getAction } from './Action';

export { Policy, Role, Statement, Subject };

export default class RoleBasedAccessControl {
  constructor(public policies: Policy[] = []) {}
}

// export default class RBAC {
//   policies: Policy[];

//   constructor(route: RouteEntry, policies: Policy[] = []) {
//     const { verb, path } = route;
//     const statement: Statement = new Statement(getAction(verb), path);
//     this.policies = [
//       ...policies,
//       new Policy(_.camelCase(verb), [statement]),
//       new Policy(_.camelCase(`${verb}_${path.replace(/\//g, '_')}`), [
//         statement
//       ]),
//       new Policy(_.camelCase(path.replace(/\//g, '_')), [statement])
//     ];
//   }
// }
