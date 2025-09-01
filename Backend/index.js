import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./Config/db.js";
import authRoute from "./Routes/auth.route.js";
import mainRoutes from "./Routes/main.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({}));

app.listen(process.env.PORT, (err) => {
  if (!err) {
    connectDB();
    console.log(`sever live at http://localhost:${process.env.PORT}`);
  }
});

app.use("/auth", authRoute);
app.use("/", mainRoutes);
