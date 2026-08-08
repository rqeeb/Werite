import express from "express";
import cors from "cors";
import { prisma } from "./lib/db.ts";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.listen(2020);

app.get("/health", async (req, res) => {
//   const createUser = await prisma.user.create({
//     data: {
//       email: "shsh@gmail.com",
//       passwordHash: "1234",
//     },
//   });

  res.json({
    message: "server is running.... 67676",
  });
});
