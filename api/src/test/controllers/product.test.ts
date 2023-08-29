import request from "supertest";

import app from "../../app";
import connect, { MongodHelper } from "../db-helper";
import { ProductDocument } from "../../models/Product";
import User from "../../models/User";

// end to end test - E2E: send request: controller=> services=> database
async function createProduct(token: string) {
  // req.body
  let product = {
    title: "test",
    price: 123,
    image: "test.png",
  };
  return await request(app)
    .post("/products")
    .set("Authorization", `Bearer ${token}`)
    .send(product);
}

// register+login - seed data - database
async function createUser(userData: { email: string; password: string }) {
  let user = new User(userData);
  return await user.save();
}

async function userLogIn(userData: { email: string; password: string }) {
  return await request(app).post("/users/login").send(userData);
}

async function getToken(userData: {
  email: string;
  password: string;
  role: string;
}) {
  await createUser(userData);
  const result = await userLogIn(userData);
  return result.body.token;
}
// test suite
describe("product controller", () => {
  //connect database
  let mongodHelper: MongodHelper;

  //Jest: set up and tear down. before all (small test)
  beforeAll(async () => {
    mongodHelper = await connect();
  });
  // clear database
  afterEach(async () => {
    await mongodHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongodHelper.closeDatabase();
  });

  // create product <= log in <= register , admin

  //small test
  it("should create a product", async () => {
    // user log in
    const token = await getToken({
      email: "test@gmail.com",
      password: "123",
      role: "admin",
    });
    const res = await createProduct(token);
    //assertion: check
    //toBe: matcher. toBe (==, no type), toEqual(===, type)
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("test");
  });

  it("should delete a product with product id", async () => {
    const token = await getToken({
      email: "test1@gmail.com",
      password: "111",
      role: "admin",
    });

    // create product => delete
    let response = await createProduct(token);
    // fake database:
    // _id
    // title: "test",
    // price: 123,
    // image: "test.png",
    expect(response.status).toBe(201);
    const productId = response.body._id;

    const res = await request(app)
      .delete(`/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toEqual(204);
    // expect(res.body).toHaveProperty("_id");
  });
});
