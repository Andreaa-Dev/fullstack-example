import { NotFoundError } from "./../helpers/apiError";
import Product, { ProductDocument } from "../models/Product";

const createProductService = async (
  product: ProductDocument
): Promise<ProductDocument> => {
  return await product.save();
};

const getProductList = async (): Promise<ProductDocument[]> => {
  return await Product.find();
};

const getProductByIdService = async (
  productId: string
): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId);
  if (!foundProduct) {
    throw new NotFoundError(`product ${productId} not found`);
  }
  return foundProduct;
};

const updateProductByIdService = async (
  productId: string,
  newInformation: Partial<ProductDocument>
): Promise<ProductDocument> => {
  const foundProduct = await Product.findByIdAndUpdate(
    productId,
    newInformation,
    { new: true }
  );
  if (!foundProduct) {
    throw new NotFoundError(`product ${productId} not found`);
  }
  return foundProduct;
};

const deleteProductByIdService = async (
  productId: string
): Promise<ProductDocument> => {
  const foundProduct = await Product.findByIdAndDelete(productId);
  if (!foundProduct) {
    throw new NotFoundError(`product ${productId} not found`);
  }
  return foundProduct;
};

export default {
  createProductService,
  getProductList,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
};
