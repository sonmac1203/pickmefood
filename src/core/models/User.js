import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    required: true,
    default: "",
  },
});

export const UserModel = models?.User || model("User", UserSchema);
