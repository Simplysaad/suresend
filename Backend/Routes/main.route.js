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

    const newOrder = new Order({
      ...req.body
    });

    await newOrder.save();

  } catch (err) {
    next(err);
  }
});

export default router;
