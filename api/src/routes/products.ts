import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductInformation,
  deleteProduct,
} from "../controllers/products";
import { Router } from "express";

const router = Router();

// where to put admin???
router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductInformation);
router.delete("/:id", deleteProduct);

export default router;
