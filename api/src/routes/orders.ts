import { Router } from "express";
import passport from "passport";

import {
  createOrderController,
  getOrderListByUserId,
} from "../controllers/orders";

const router = Router();

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  createOrderController
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getOrderListByUserId
);

export default router;
