import { Router } from "express";
import passport from "passport";

import {
  createUser,
  logInWithPassword,
  updateUserController,
} from "../controllers/users";

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

export default router;
