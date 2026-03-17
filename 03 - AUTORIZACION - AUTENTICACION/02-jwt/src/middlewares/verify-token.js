import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const verifyTokenHeader = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) throw new Error("Unauthorized");
    // Bearer fjksdñfkjsdkfjsdñkfjsdñfofj234r23
    const tokenWhitoutBearer = authHeader.split(" ")[1];
    // [Bearer, fjksdñfkjsdkfjsdñkfjsdñfofj234r23]
    const payload = jwt.verify(tokenWhitoutBearer, config.SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyTokenCookies = (req, res, next) => {
  try {
    const authCookie = req.cookies.accessToken;
    if (!authCookie) throw new Error("Unauthorized");
    const payload = jwt.verify(authCookie, config.SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
