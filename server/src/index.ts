import "dotenv/config"
import express from "express";
import cors from "cors";
import router from "./routes/auth.ts";
import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/auth",router);
      
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "server is running!",
  });
});

app.listen(process.env.PORT||2020);