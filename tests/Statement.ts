import { Statement } from '../src';

describe('new Statement(action, resource)', () => {
  it('should create new statement', async () => {
    const statement = new Statement('read', 'file');
    expect(statement).toEqual({
      action: 'read',
      allow: true,
      resource: 'file'
    });
  });
});
