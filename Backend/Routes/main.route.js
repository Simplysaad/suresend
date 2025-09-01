import { Router } from "express";
const router = Router();

import transporter from "../Utils/nodemailer.util.js";
import Order from "../Models/order.model.js";
import generateOrderTrackingID from "../Utils/createId.util.js"

router.post("/order", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - Nothing is being sent"
      });
    }

    const { senderName, senderPhoneNumber, receiverName, receiverPhoneNumber } =
      req.body;

    // {
    //   pickupAddress,
    //     dropoffAddress,
    //     goodsType,
    //     deliveryDate,
    //     description,
    //     additionalNotes;
    // }

    // const orderId =

    const newOrder = new Order({
      orderId: generateOrderTrackingID(),
      sender: {
        name: senderName,
        phoneNumber: senderPhoneNumber
      },
      reciever: {
        name: receiverName,
        phoneNumber: receiverPhoneNumber
      },
      ...req.body
    });

    await newOrder.save();

    req.orderId = newOrder._id;
  } catch (err) {
    next(err);
  }
});

// const paystackAxios = axios.create({
//   base_url: "api.paystack.co"
// });

export const postPayment = async (req, res, next) => {
  const BASE_URL = "api.paystack.co";

  const { amount, reference, id } = req.query || req.body;
  const { endpoint } = req.params;

  let body = {};
  let { method } = req.headers;

  if (method === "post" && endpoint === "initialize") {
    body.amount = amount;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/transaction/${endpoint}/${reference}`,
      {
        method,
        headers: {
          Authentication: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        },
        body
      }
    );

    const { status: success, message, data } = await response.json();

    if (!success) {
      return res.status(500).json({
        success,
        message
      });
    }

    if (method === "get" && endpoint === "verify") {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: req.orderId },
        {
          $set: {
            payment: { id, reference },
            status: "paid"
          }
        },
        { new: true }
      );
    }

    return res.status(201).json({
      success,
      message,
      data
    });

    // {
    //   "status": true,
    //   "message": "Authorization URL created",
    //   "data": {
    //     "authorization_url": "https://checkout.paystack.com/3ni8kdavz62431k",
    //     "access_code": "3ni8kdavz62431k",
    //     "reference": "re4lyvq3s3"
    //   }
    // }
  } catch (err) {
    next(err);
  }
};

const mainRoutes = router;
export default router;
