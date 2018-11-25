import { Statement } from '../src';

describe('new Statement(action, resource)', () => {
  it('should create new statement', async () => {
    const statement = new Statement('action', 'resource');
    expect(statement).toEqual({
      action: 'action',
      allow: true,
      resource: 'resource'
    });
  });
});
