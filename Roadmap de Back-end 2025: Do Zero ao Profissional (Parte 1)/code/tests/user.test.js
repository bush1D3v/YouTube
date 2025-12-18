process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const { sequelize } = require("../src/config/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../src/config/env");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test("dono vê dados completos, outros só nome", async () => {
  const userA = await User.create({
    name: "A",
    email: "a@a.com",
    phone: "111",
    passwordHash: "hash"
  });
  const userB = await User.create({
    name: "B",
    email: "b@b.com",
    phone: "222",
    passwordHash: "hash"
  });

  const tokenA = jwt.sign({ sub: userA.id }, JWT_SECRET);

  const resOwner = await request(app)
    .get(`/users/${userA.id}`)
    .set("Authorization", `Bearer ${tokenA}`);

  expect(resOwner.status).toBe(200);
  expect(resOwner.body.email).toBe("a@a.com");
  expect(resOwner.body.passwordHash).toBeUndefined();

  const resOther = await request(app)
    .get(`/users/${userB.id}`)
    .set("Authorization", `Bearer ${tokenA}`);

  expect(resOther.status).toBe(200);
  expect(resOther.body).toEqual({ name: "B" });
});

test("PUT/DELETE só dono (403 se não for)", async () => {
  const owner = await User.create({
    name: "Owner",
    email: "owner@a.com",
    phone: "999",
    passwordHash: "hash"
  });
  const other = await User.create({
    name: "Other",
    email: "other@a.com",
    phone: "000",
    passwordHash: "hash"
  });

  const tokenOther = jwt.sign({ sub: other.id }, JWT_SECRET);

  const resPut = await request(app)
    .put(`/users/${owner.id}`)
    .set("Authorization", `Bearer ${tokenOther}`)
    .send({ name: "Hacked" });

  expect(resPut.status).toBe(403);

  const resDel = await request(app)
    .delete(`/users/${owner.id}`)
    .set("Authorization", `Bearer ${tokenOther}`);

  expect(resDel.status).toBe(403);
});
