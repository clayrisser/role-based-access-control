import * as _ from 'lodash';
import { Policy, Role, Statement, Subject } from '../src';

const statements = {
  readFile: new Statement('read', 'file'),
  readFolder: new Statement('read', 'folder'),
  removeFile: new Statement('remove', 'file'),
  removeFolder: new Statement('remove', 'folder'),
  writeFile: new Statement('write', 'file'),
  writeFolder: new Statement('write', 'folder')
};

const policies = {
  readFile: new Policy('readFile', [statements.readFile]),
  readFolder: new Policy('readFolder', [statements.readFolder]),
  removeFile: new Policy('removeFile', [statements.removeFile]),
  removeFolder: new Policy('removeFolder', [statements.removeFolder]),
  writeFile: new Policy('readFile', [statements.writeFile]),
  writeFolder: new Policy('readFolder', [statements.writeFolder]),
  readAll: new Policy('readAll', [statements.readFile, statements.readFolder]),
  removeAll: new Policy('removeAll', [
    statements.removeFile,
    statements.removeFolder
  ]),
  writeAll: new Policy('readAll', [
    statements.writeFile,
    statements.writeFolder
  ]),
  allFiles: new Policy('allFiles', [
    statements.readFile,
    statements.writeFile,
    statements.removeFile
  ]),
  allFolders: new Policy('allFolders', [
    statements.readFolder,
    statements.writeFolder,
    statements.removeFolder
  ])
};

const roles = {
  visitor: new Role('visitor', [policies.readAll]),
  user: new Role('user', [policies.readAll, policies.writeAll]),
  admin: new Role('admin', [policies.allFiles, policies.allFolders])
};

describe('roleBasedAccessControl', () => {
  const someVisitor = new Subject('someVisitor', [roles.visitor]);
  const someUser = new Subject('someUser', [roles.user]);
  const someAdmin = new Subject('someAdmin', [roles.admin]);
  it('grants subjects access', async () => {
    expect(someVisitor.can(statements.readFile)).toBe(true);
    expect(someVisitor.can(statements.readFolder)).toBe(true);
    expect(someUser.can(statements.readFile)).toBe(true);
    expect(someUser.can(statements.readFolder)).toBe(true);
    expect(someUser.can(statements.writeFile)).toBe(true);
    expect(someUser.can(statements.writeFolder)).toBe(true);
    expect(someAdmin.can(statements.readFile)).toBe(true);
    expect(someAdmin.can(statements.readFolder)).toBe(true);
    expect(someAdmin.can(statements.removeFile)).toBe(true);
    expect(someAdmin.can(statements.removeFolder)).toBe(true);
    expect(someAdmin.can(statements.writeFile)).toBe(true);
    expect(someAdmin.can(statements.writeFolder)).toBe(true);
  });
  it('blocks subjects access', async () => {
    expect(someVisitor.can(statements.removeFile)).toBe(false);
    expect(someVisitor.can(statements.removeFolder)).toBe(false);
    expect(someVisitor.can(statements.writeFile)).toBe(false);
    expect(someVisitor.can(statements.writeFolder)).toBe(false);
    expect(someUser.can(statements.removeFile)).toBe(false);
    expect(someUser.can(statements.removeFolder)).toBe(false);
  });
});
