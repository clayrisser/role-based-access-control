import { Policy, Role, Statement, Subject } from '../src';

const policies = {
  read: new Policy('read', [new Statement('get', 'post')])
};

const roles = {
  visitor: new Role('read', [policies.read])
};

describe('new Subject(name, roles).can(action, resource)', () => {
  const user = new Subject('user', [roles.visitor]);
  it('should grant user access', async () => {
    expect(user.can('get', 'post')).toBe(true);
  });
  it('should block user access', async () => {
    const user = new Subject('user', []);
    expect(user.can('get', 'post')).toBe(false);
  });
  it('should list all unique statements', async () => {
    expect(user.statements).toEqual([policies.read.statements[0]]);
  });
});
