import morgan from "morgan";

export default function requestLogger(app) {
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
}
