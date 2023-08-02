import { ProductDocument } from "./../models/Product";
import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";
import ProductServices from "../services/products";

// next function
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // way1: de-structuring object here
  const { title, price, image } = req.body;
  // for local image
  // const { title, price, imageName } = req.body;

  const productInformation = new Product({
    title: title,
    price: price,
    image: image,
    // image path = path + image name
    // image name
    // image: imageName,
  });

  // way2
  // const productInformation = new Product({
  //   title: req.body.title,
  //   price: req.body.price,
  // });

  try {
    const product = await ProductServices.createProductService(
      productInformation
    );
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
    const productList = await ProductServices.getProductList();
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
    const product = await ProductServices.getProductByIdService(productId);
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
    // if the user is admin
    // if(User.role === "user"){

    // }
    const productId = req.params.id;

    const newInformation = req.body;
    const newProduct = await ProductServices.updateProductByIdService(
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
    // if()
    const productId = req.params.id;
    await ProductServices.deleteProductByIdService(productId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
