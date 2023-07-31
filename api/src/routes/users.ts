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

// create user
router.post("/", createUser);

// log in / register
router.post("/login", logInWithPassword);

// update user information
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUserController
);
// user has log in
// router.get("/:id", getUserById);

// get list of user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  getAllUsersController
);

// role: user =>
// andrea => admin
// change helen@gmail.com from user => admin
// which user to change the role
// helen id

router.put(
  "/:userId/make-admin",
  passport.authenticate("jwt", { session: false }),
  adminCheck,
  makeAdmin
);

// google
router.post(
  "/google-login",
  passport.authenticate("google-id-token", { session: false }),
  googleAuthenticate
);

export default router;
