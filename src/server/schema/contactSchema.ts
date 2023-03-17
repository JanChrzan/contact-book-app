import mongoose, { Document } from "mongoose";

export interface IContact extends Document {
  id: string;
  ownerId: string;
  fullName: string;
  address: string;
  email: string;
  phoneNumber: string;
  notes: string;
}

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  ownerId: { type: String, required: true },
  fullName: { type: String, required: true },
  address: { type: String, required: false },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  notes: { type: String, required: false },
});

export const Contact = mongoose.model<IContact>("Contacts", userSchema);
