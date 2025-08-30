import { Router } from "express";
const router = Router();

import transporter from "../Utils/nodemailer.util.js";
import Order from "../Models/order.model.js";

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

    // const orderId = 

    const newOrder = new Order({
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
  } catch (err) {
    next(err);
  }
});

export default router;
