import { Policy, Role, Statement, Subject } from '../src';

const policies = {
  read: new Policy('read', [new Statement('read', 'file')]),
  readFile: new Policy('read', [new Statement('read', 'file')]),
  write: new Policy('read', [new Statement('write', 'file')])
};

const roles = {
  visitor: new Role('read', [policies.read, policies.readFile, policies.write])
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
    expect(subject.can(new Statement('read', 'file'))).toEqual(true);
  });
  it('should block subject access', async () => {
    const subject = new Subject('user', []);
    expect(subject.can(new Statement('read', 'file'))).toEqual(false);
  });
  it('should list all unique statements', async () => {
    expect(subject.statements).toEqual([
      policies.read.statements[0],
      policies.write.statements[0]
    ]);
  });
});
