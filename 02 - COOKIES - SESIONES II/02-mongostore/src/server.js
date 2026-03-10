import express from "express";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import { initMongoDB } from "./config/db-connection.js";
import config from "./config/index.js";
import userRouter from "./routes/user-router.js";

const app = express();

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_URL,
    ttl: 180,
    crypto: {
        secret: config.SECRET_KEY
    }
  }),
  secret: config.SECRET_KEY,
  cookie: { maxAge: 180000, httpOnly: true },
  saveUninitialized: true,
  resave: false,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SECRET_KEY));
app.use(session(sessionConfig));

app.use("/api/users", userRouter);

initMongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.listen(8080, () => console.log("Server running on port 8080"));
