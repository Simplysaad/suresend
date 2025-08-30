import { Schema, model } from "mongoose";

const userId = {
  type: mongoose.Schema.Type.ObjectId,
  ref: "user"
};
const user = {
  name: String,
  email: String,
  phoneNumber: String
};

const orderSchema = Schema(
  {
    orderId: String,
    sender: userId || user,
    receiver: userId || user,
    
    pickupAddress: String,
    dropoffAddress: String,
    goodsType: String,
    deliveryDate: {
      type: Date,
      default: Date.now()
    },
    status: {
      type: String,
      enum: ["pending", "delivered"],
      default: "pending"
    },
    description: String,
    additionNotes: String
  },
  {
    timestamps: true
  }
);

const Order = model("user", orderSchema);
export default Order;
