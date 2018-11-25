import { Policy, Role, Statement, Subject } from '../src';

const policies = {
  read: new Policy('read', [new Statement('get', 'post')]),
  readPost: new Policy('read', [new Statement('get', 'post')]),
  write: new Policy('read', [new Statement('post', 'post')])
};

const roles = {
  visitor: new Role('read', [policies.read, policies.readPost, policies.write])
};

describe('new Subject(name, roles)', () => {
  const subject = new Subject('user', [roles.visitor]);
  it('should create new subject', async () => {
    expect(subject).toEqual({
      description: 'user',
      name: 'user',
      roles: [roles.visitor]
    });
  });
});

describe('subject.can(action, resource)', () => {
  const subject = new Subject('user', [roles.visitor]);
  it('should grant subject access', async () => {
    expect(subject.can('get', 'post')).toBe(true);
  });
  it('should block subject access', async () => {
    const subject = new Subject('user', []);
    expect(subject.can('get', 'post')).toBe(false);
  });
  it('should list all unique statements', async () => {
    expect(subject.statements).toEqual([
      policies.read.statements[0],
      policies.write.statements[0]
    ]);
  });
});
