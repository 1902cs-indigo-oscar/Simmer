const request = require('supertest');
const {expect} = require('chai')

const db = require("../../server/db");
const {User} = require("../../server/db/models")
const app = require("../../server")

beforeEach(async () => {
  await db.sync({ force: true });
  const newUserInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    password: '12345',
  }
  await User.create(newUserInfo)
});