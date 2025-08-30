import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client"
    },
  },
  {
    timestamps: true
  }
);

const User = model("user", userSchema);
export default User;
