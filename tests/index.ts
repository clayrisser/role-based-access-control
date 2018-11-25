import RoleBasedAccessControl from '../src';

describe('RoleBasedAccessControl', () => {
  it('is class', async () => {
    expect(!!RoleBasedAccessControl).toBe(!!new RoleBasedAccessControl());
  });
});

describe('RoleBasedAccessControl()', () => {
  it('should do something', async () => {
    const rbac = new RoleBasedAccessControl();
    expect(!!rbac).toBe(true);
  });
});
