import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // enum: "user" | "admin"| "subUser"
  role: string;
  isBanned: boolean;
  avatar: string;
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
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
  avatar: {
    type: String,
  },
});

export default mongoose.model<UserDocument>("User", UserSchema);
