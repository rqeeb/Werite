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
        title: title || "New Document",
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

router.get("/", authMiddleware, async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({
      error: "Not authenticated",
    });
  }
  const ownerId = req.userId;

  try {
    const documents = await prisma.document.findMany({
      where: {
        ownerId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.status(200).json({
      documents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      error: "User not authenticated",
    });
  }

  if (typeof id !== "string") {
    return res.status(400).json({
      error: "Invalid document id type",
    });
  }

  try {
    const document = await prisma.document.findFirst({
      where: {
        id,
        ownerId: req.userId,
      },
    });

    if (!document) {
      return res.status(404).json({
        error: "Document not found",
      });
    }

    return res.status(200).json({
      document,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log(error);
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({
      error: "User not authenticated",
    });
  }

  const { id } = req.params;
  const { title, content } = req.body;

  if (typeof id !== "string") {
    return res.status(400).json({
      error: "Invalid document id type",
    });
  }

  if (title === undefined && content === undefined) {
    return res.status(400).json({
      error: "Nothing to update",
    });
  }

  try {
    const document = await prisma.document.findFirst({
      where: {
        id,
        ownerId: req.userId,
      },
    });

    if (!document) {
      return res.status(404).json({
        error: "Document not found",
      });
    }

    const updatedDocument = await prisma.document.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    return res.status(200).json({
      updatedDocument,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      error: "User not authenticated",
    });
  }

  if (typeof id !== "string") {
    return res.status(400).json({
      error: "Invalid document id type",
    });
  }

  try {
    const document = await prisma.document.findFirst({
      where: {
        id,
        ownerId: req.userId,
      },
    });

    if (!document) {
      return res.status(400).json({
        error: "Document not found",
      });
    }

    const deletedDocument = await prisma.document.delete({
      where: {
        id,
        ownerId: req.userId,
      },
    });

    return res.status(200).json({
      deletedDocument,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
