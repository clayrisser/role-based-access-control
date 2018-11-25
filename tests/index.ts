import RoleBasedAccessControl from '../src';

describe('RoleBasedAccessControl', () => {
  it('is class', async () => {
    expect(!!RoleBasedAccessControl).toBe(!!new RoleBasedAccessControl());
  });
});
