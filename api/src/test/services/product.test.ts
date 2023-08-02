import Product from "../../models/Product";
import ProductService from "../../services/products";
import connect, { MongodHelper } from "../db-helper";

async function createProduct() {
  const product = new Product({
    title: "test1",
    price: 1,
    image: "test1.png",
  });
  return await product.save();
}

// integration test

describe("product service", () => {
  let mongodHelper: MongodHelper;

  beforeAll(async () => {
    mongodHelper = await connect();
  });

  afterEach(async () => {
    await mongodHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongodHelper.closeDatabase();
  });

  it("should create a product", async () => {
    // result =  new Product{}
    const productData = new Product({
      title: "test",
      price: 1,
      image: "test.png",
    });
    const product = await ProductService.createProductService(productData);

    expect(product).toHaveProperty("_id");
    expect(product).toHaveProperty("title", "test");
    expect(product).toHaveProperty("price", 1);
  });

  it("should get a product with id", async () => {
    const product = await createProduct();
    const found = await ProductService.getProductByIdService(product._id);
    expect(found.title).toEqual(product.title);
    expect(found._id).toEqual(product._id);
  });

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  //   it("should not get a non-existing movie", async () => {
  //     expect.assertions(1);
  //     return MovieService.findById(nonExistingMovieId).catch((e) => {
  //       expect(e.message).toMatch(`Movie ${nonExistingMovieId} not found`);
  //     });
  //   });

  //   it("should update an existing movie", async () => {
  //     const movie = await createMovie();
  //     const update = {
  //       name: "Shrek",
  //       publishedYear: 2001,
  //     };
  //     const updated = await MovieService.update(movie._id, update);
  //     expect(updated).toHaveProperty("_id", movie._id);
  //     expect(updated).toHaveProperty("name", "Shrek");
  //     expect(updated).toHaveProperty("publishedYear", 2001);
  //   });

  //   it("should not update a non-existing movie", async () => {
  //     expect.assertions(1);
  //     const update = {
  //       name: "Shrek",
  //       publishedYear: 2001,
  //     };

  //     return MovieService.update(nonExistingMovieId, update).catch((e) => {
  //       expect(e.message).toMatch(`Movie ${nonExistingMovieId} not found`);
  //     });
  //   });

  //   it("should delete an existing movie", async () => {
  //     expect.assertions(1);
  //     const movie = await createMovie();
  //     await MovieService.deleteMovie(movie._id);
  //     return MovieService.findById(movie._id).catch((e) => {
  //       expect(e.message).toBe(`Movie ${movie._id} not found`);
  //     });
  //   });
});
