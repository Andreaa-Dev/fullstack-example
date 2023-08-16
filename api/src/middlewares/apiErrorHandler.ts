import { Request, Response, NextFunction } from "express";

import ApiError from "../helpers/apiError";

// 2 types: function
export default function (
  error: ApiError,
  req: Request,
  res: Response
  // next: NextFunction
) {
  console.log("running");
  res.status(error.statusCode).json({
    status: "error",
    statusCode: error.statusCode,
    message: error.message,
  });
}
