import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  email: string;
  password: string;
  firstName: string;
  role: string;
  isBanned: boolean;
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  isBanned: {
    type: String,
    default: false,
  },
  // log in with google
});

export default mongoose.model<UserDocument>("User", UserSchema);
