import { Router } from "express";
import { prisma } from "../lib/db";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.userId) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    const document = await prisma.document.create({
      data: {
        title: title || "Untitled",
        content: content || "",
        ownerId: req.userId,
      },
    });

    return res.status(201).json({
      document,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
