import { Policy, Statement } from '../src';

const statements = [new Statement('read', 'file')];

describe('new Policy(name, statements)', () => {
  const policy = new Policy('read', statements);
  it('should create new policy', async () => {
    expect(policy).toEqual({
      statements,
      description: 'read',
      name: 'read'
    });
  });
});
