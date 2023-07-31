import { NotFoundError } from "../helpers/apiError";
import User, { UserDocument } from "../models/User";

const createUserService = async (user: UserDocument): Promise<UserDocument> => {
  return await user.save();
};

const getAllUsers = async (): Promise<UserDocument[]> => {
  return await User.find();
};

const findUserByEmail = async (userEmail: string): Promise<UserDocument> => {
  const foundUser = await User.findOne({ email: userEmail });
  if (!foundUser) {
    throw new NotFoundError(`Product ${userEmail} not found`);
  }
  return foundUser;
};

const updateUser = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  });

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`);
  }
  return foundUser;
};

const findOrCreate = async (payload: Partial<UserDocument>) => {
  const result = await User.findOne({ email: payload.email });
  if (result) {
    return result;
  } else {
    const user = new User({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      avatar: payload.avatar,
    });
    const createdUser = await user.save();
    return createdUser;
  }
};

const banUser = async (userId: string) => {
  const foundUser = await User.findOne({ _id: userId });
  if (foundUser) {
    if (foundUser.isBanned === true) {
      foundUser.isBanned = false;
      updateUser(userId, foundUser);
    } else {
      foundUser.isBanned = true;
      updateUser(userId, foundUser);
    }
  } else {
    throw new NotFoundError("User not found");
  }
};
const makeAdmin = async (userId: string) => {
  const foundUser = await User.findOne({ _id: userId });
  if (foundUser) {
    if (foundUser.role === "admin") {
      foundUser.role = "user";
    } else {
      if (foundUser.isBanned === true) {
        foundUser.role = "user";
      } else {
        foundUser.role = "admin";
      }
    }
    updateUser(userId, foundUser);
  } else {
    throw new NotFoundError(`User not found with ${userId}`);
  }
};

export default {
  createUserService,
  getAllUsers,
  findUserByEmail,
  updateUser,
  findOrCreate,
  banUser,
  makeAdmin,
};
