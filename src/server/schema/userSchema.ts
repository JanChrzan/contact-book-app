import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  ipAddress: string;
}

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  ipAddress: { type: String, required: true },
});

export const User = mongoose.model<IUser>("Users", userSchema);
