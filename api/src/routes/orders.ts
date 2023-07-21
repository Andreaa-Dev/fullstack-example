import { Router } from "express";
import passport from "passport";

import {
  createOrderController,
  getOrderListByUserId,
} from "../controllers/orders";

const router = Router();

// create order
router.post(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  createOrderController
);

// get orderList by user id
router.get(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  getOrderListByUserId
);

export default router;
