import RoleBasedAccessControl, {
  Policy,
  Role,
  Statement,
  Subject
} from '../src';

const policies = {
  read: new Policy('read', [new Statement('get', 'post')])
};

const roles = {
  visitor: new Role('read', [policies.read])
};

describe('RoleBasedAccessControl', () => {
  it('is class', async () => {
    expect(!!RoleBasedAccessControl).toBe(!!new RoleBasedAccessControl());
  });
});

describe('new Subject(name, roles).can(action, resource)', () => {
  it('should grant user access', async () => {
    const user = new Subject('user', [roles.visitor]);
    expect(user.can('get', 'post')).toBe(true);
  });
  it('should block user access', async () => {
    const user = new Subject('user', []);
    expect(user.can('get', 'post')).toBe(false);
  });
});
