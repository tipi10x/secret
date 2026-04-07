// models/User.ts
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // lưu hash
    isAdmin: { type: Boolean, default: false },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const User = models.User || model("User", UserSchema);
export default User;
