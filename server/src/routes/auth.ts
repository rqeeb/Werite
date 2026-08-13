import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/db";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authMiddleware } from "../middleware/auth.middleware";
import { useTransition } from "react";

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Enter a valid email address",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "password must be at least 8 characters",
      });
    }

    const normalisedEmail = email.trim().toLowerCase();
    const existingUser = await prisma.user.findUnique({
      where: { email: normalisedEmail },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "User already exist, please login",
      });
    }

    const passwordHash = await bcrypt.hash(password, 13);

    const username = normalisedEmail.split("@")[0];
    const createUser = await prisma.user.create({
      data: {
        email: normalisedEmail,
        passwordHash,
        username,
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
    return res.status(401).json({
      error: "Email and password both are required",
    });
  }

  const normalisedEmail = email.trim().toLowerCase();
  const userExists = await prisma.user.findUnique({
    where: { email: normalisedEmail },
  });

  if (!userExists) {
    return res.status(401).json({
      error: "Invalid credentials or user doesn't exists",
    });
  }

  if (await bcrypt.compare(password, userExists.passwordHash)) {
    const token = jwt.sign({ userId: userExists.id }, JWT_SECRET!, {
      expiresIn: "7d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "login successful",
        user: {
          id: userExists.id,
          username: userExists.username,
          email: userExists.email,
        },
      });
  } else {
    return res.status(400).json({
      error: "Invalid credentials or user doesn't exists",
    });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return res.json({
    user,
  });
});

export default router;
