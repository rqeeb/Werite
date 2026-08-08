import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/db";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "Email & password both are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exist please login",
      });
    }

    const passwordHash = await bcrypt.hash(password, 13);
    const createUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    res.status(201).json({
      message: "signup successfull, please login",
      user: {
        email: createUser.email,
        id: createUser.id,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password both are required",
    });
  }

  const userExists = await prisma.user.findUnique({
    where: {email},
  });

  if (!userExists) {
    return res.status(400).json({
      error: "Invalid credentials or user doesn't exists",
    });
  }

  if (await bcrypt.compare(password, userExists.passwordHash)) {
    const token =  jwt.sign(
      { userId: userExists.id },
      JWT_SECRET!,
    );

    res.status(200).json({
      message:"login successful",
      token,
    });
  } else {
    return res.status(400).json({
      error: "Invalid credentials or user doesn't exists",
    });
  }
});

export default router;
