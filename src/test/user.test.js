const User = require('../../server/db/models/user');
const db = require('../../server/db');

beforeEach(async () => await db.sync({ force: true }));

describe.only('User Model', () => {
  let newUser;
  let newUserInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    password: '12345',
  };

  describe('should create a user', () => {
    beforeAll(async () => {
      expect.assertions(1);
      newUser = await User.create(newUserInfo);
    });

    test('when a valid first name is provided', () => {
      expect.assertions(1);
      expect(newUser.firstName).toEqual('John');
    });

    test('when a valid last name is provided', () => {
      expect.assertions(1);
      expect(newUser.lastName).toEqual('Doe');
    });

    test('when a valid email is provided', () => {
      expect.assertions(1);
      expect(newUser.email).toEqual('johndoe@gmail.com');
    });
  });

  describe('instance method correctPassword', () => {
    test('should return true when the correct password is provided', () => {
      expect.assertions(1);
      expect(newUser.correctPassword('12345')).toEqual(true);
    });

    test('should return false when the incorrect password is provided', () => {
      expect.assertions(1);
      expect(newUser.correctPassword('123456')).toEqual(false);
    });
  });

  // describe('should not create a user', () => {});
});
