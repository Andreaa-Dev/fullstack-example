import { Router } from "express";
import passport from "passport";

import {
  createUser,
  logInWithPassword,
  updateUserController,
  getAllUsersController,
  makeAdmin,
  googleAuthenticate,
} from "../controllers/users";
import adminCheck from "../middlewares/adminCheck";

const router = Router();

router.post("/", createUser);

router.post("/login", logInWithPassword);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUserController
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  getAllUsersController
);

router.put(
  "/:userId/make-admin",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  makeAdmin
);

router.post(
  "/google-login",
  passport.authenticate("google-id-token", { session: false }),
  googleAuthenticate
);

export default router;
