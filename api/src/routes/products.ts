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

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  createProduct
);

router.get("/", getAllProducts);
router.get("/:productId", getProductById);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  updateProductInformation
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  deleteProduct
);

export default router;
