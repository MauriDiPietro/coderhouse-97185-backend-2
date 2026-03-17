import express from "express";
import cookieParser from "cookie-parser";
import { initMongoDB } from "./config/db-connection.js";
import config from "./config/index.js";
import userRouter from "./routes/user-router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SECRET_KEY));

app.use("/api/users", userRouter);

initMongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.listen(8080, () => console.log("Server running on port 8080"));
