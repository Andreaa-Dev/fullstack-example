import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductInformation,
  deleteProduct,
} from "../controllers/products";
import { Router } from "express";
import adminCheck from "../middlewares/adminCheck";
import passport from "passport";

const router = Router();

// where to put admin???
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  createProduct
);

router.get("/", getAllProducts);
router.get("/:id", getProductById);

// admin
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  // found user
  adminCheck,
  updateProductInformation
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  // found user
  deleteProduct
);

export default router;
