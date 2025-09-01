import mongoose, { Schema, model } from "mongoose";

const userId = {
  type: Schema.Types.ObjectId,
  ref: "user"
};
const user = {
  name: String,
  email: String,
  phoneNumber: String
};

const orderSchema = new Schema(
  {
    orderId: String,
    sender: user,
    receiver: user,
    pickupAddress: String,
    dropoffAddress: String,
    goodsType: String,
    deliveryDate: {
      type: Date,
      default: Date.now()
    },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered"],
      default: "pending"
    },
    description: String,
    additionNotes: String,
    payment: {
      id: Number,
      reference: String
    }
  },
  {
    timestamps: true
  }
);

const Order = model("order", orderSchema);
export default Order;
