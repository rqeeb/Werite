import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.ts";
import documentRouter from "./routes/document.ts";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(express.json());

const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL].filter(
  (origin): origin is string => Boolean(origin),
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/api/document", documentRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({
    message: "server is running!",
  });
});

const port = Number(process.env.PORT) || 2020;

app.listen(port, "0.0.0.0", () => {
  console.log(`Running on port ${port}`);
});
