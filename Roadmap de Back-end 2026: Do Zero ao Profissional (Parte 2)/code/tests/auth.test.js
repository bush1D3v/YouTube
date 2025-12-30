process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/config/db");
require("../src/models/User");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test("register cria usuário", async () => {
  const res = await request(app).post("/auth/register").send({
    name: "Erackson",
    email: "e@e.com",
    phone: "9999",
    password: "123456"
  });

  expect(res.status).toBe(201);
  expect(res.body.email).toBe("e@e.com");
  expect(res.body.passwordHash).toBeUndefined();
});

test("login retorna token", async () => {
  // garante que existe usuário antes do login
  await request(app).post("/auth/register").send({
    name: "Erackson2",
    email: "e2@e.com",
    phone: "8888",
    password: "123456"
  });

  const res = await request(app).post("/auth/login").send({
    email: "e2@e.com",
    password: "123456"
  });

  expect(res.status).toBe(200);
  expect(res.body.token).toBeTruthy();
});
