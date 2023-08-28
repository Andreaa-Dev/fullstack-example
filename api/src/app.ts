import passport from "passport";
import express from "express";
import cors from "cors";
// import path from "path";

import productRouter from "./routes/products";
import userRouter from "./routes/users";
import orderRouter from "./routes/orders";
import apiErrorHandler from "./middlewares/apiErrorHandler";
import { jwtStrategy } from "./config/passport";

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(jwtStrategy);
// passport.use(googleStrategy);

// routes
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

// Serve product images from the 'images' folder
// host image in cloud

// console.log(__dirname);
// app.use(
//   "/static",
//   express.static(path.join(__dirname, "images"), { fallthrough: false })
// );
// http://localhost:8000/static/peony.webp

// handler error here
app.use(apiErrorHandler);

export default app;
