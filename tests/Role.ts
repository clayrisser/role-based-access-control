import { Policy, Role, Statement } from '../src';

const policies = {
  read: new Policy('read', [new Statement('read', 'file')])
};

describe('new Role(name, policies)', () => {
  const role = new Role('visitor', [policies.read]);
  it('should create new role', async () => {
    expect(role).toEqual({
      description: 'visitor',
      name: 'visitor',
      policies: [policies.read]
    });
  });
  it('should list all unique statements', async () => {
    expect(role.statements).toEqual([policies.read.statements[0]]);
  });
});
