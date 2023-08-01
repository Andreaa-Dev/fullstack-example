import { Response, Request, NextFunction } from "express";

import { ForbiddenError } from "../helpers/apiError";
import { UserDocument } from "../models/User";

// why need admin ???
// function
const adminCheck = async (req: Request, res: Response, next: NextFunction) => {
  // req.body
  // req.user

  console.log(req, "request in middleware");
  const userData = req.user as UserDocument;
  const userRole = userData.role;

  console.log(userRole, "user");
  //  if (userRole === "subUser") {update }

  if (userRole === "admin") {
    next();
  } else {
    throw new ForbiddenError();
  }
};

export default adminCheck;
