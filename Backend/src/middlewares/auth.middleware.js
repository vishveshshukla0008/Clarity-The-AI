import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { getRedis } from "../config/cache.js";

export const identifyUser = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    req.user = null;
    throw new AppError(401, "Unauthorized Access! Please signup/login.");
  }

  const redis = getRedis();

  const isBlacklisted = await redis.get(`blacklist:${token}`);

  if (isBlacklisted) {
    res.clearCookie("token");
    throw new AppError(401, "Session expired. Please login again.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    req.user = null;

    res.clearCookie("token");

    throw new AppError(401, "Unauthorized!");
  }
});
