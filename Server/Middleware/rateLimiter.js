import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message:
    "We have received too many requests from this IP. Please try again after one hour",
});

export default limiter;
