import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";
import {
  createProductService,
  getProductList,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
} from "../services/products";

// next function
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // way1: de-structuring object here
  const { title, price, imageName } = req.body;
  const productInformation = new Product({
    title: title,
    price: price,
    // image path = path + image name
    // image name
    image: imageName,
  });

  // way2
  // const productInformation = new Product({
  //   title: req.body.title,
  //   price: req.body.price,
  // });

  try {
    const product = await createProductService(productInformation);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productList = await getProductList();
    res.status(200).json(productList);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;
    const product = await getProductByIdService(productId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProductInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;

    const newInformation = req.body;
    const newProduct = await updateProductByIdService(
      productId,
      newInformation
    );
    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;
    await deleteProductByIdService(productId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
