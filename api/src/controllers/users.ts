import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import User, { UserDocument } from "../models/User";
import UserServices from "../services/users";
import { BadRequestError } from "../helpers/apiError";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userInformation = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = await UserServices.createUserService(userInformation);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userList = await UserServices.getAllUsers();
    res.status(200).json(userList);
  } catch (error) {
    next(error);
  }
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
// log in
export const logInWithPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await UserServices.findUserByEmail(req.body.email);
    if (!userData) {
      res.status(403).json({ message: "user do not have account yet" });
      return;
    }
    const match = await bcrypt.compare(userData.password, req.body.password);
    if (match) {
      throw new BadRequestError("Password does not match  !");
    }
    const token = jwt.sign(
      {
        email: userData.email,
        _id: userData._id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ userData, token });
  } catch (error) {
    next(error);
  }
};

// update
export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body;
    const userId = req.params.id;
    const updatedUser = await UserServices.updateUser(userId, update);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// make admin
export const makeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    await UserServices.makeAdmin(userId);
    res.sendStatus(200);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// google
export const googleAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.user as UserDocument;
    const token = jwt.sign(
      {
        // first name + last name
        email: userData.email,
        _id: userData._id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    if (!userData) {
      res.json({ message: "can't find user with this email" });
      return;
    } else {
      res.json({ token, userData });
    }
  } catch (error) {
    next(error);
  }
};
