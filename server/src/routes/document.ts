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
        OR: [
          { ownerId: req.userId },
          { memberships: { some: { userId: req.userId } } },
        ],
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
      },
    });

    const documentMember = await prisma.documentMember.findFirst({
      where: {
        documentId: id,
        userId: req.userId,
      },
    });

    if (!document) {
      return res.status(404).json({
        error: "Document not found",
      });
    }

    if (document.ownerId != req.userId && !documentMember) {
      return res.status(403).json({
        error: "You don't have access to this document",
      });
    }

    const canEdit =
      req.userId === document.ownerId || documentMember?.role === "EDITOR";
    const isOwner = document.ownerId === req.userId;

    return res.status(200).json({
      canEdit,
      document,
      isOwner,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
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
      },
    });

    if (!document) {
      return res.status(404).json({
        error: "Document not found",
      });
    }

    const memberRole = await prisma.documentMember.findFirst({
      where: {
        documentId: id,
        userId: req.userId,
        role: "EDITOR",
      },
    });

    if (!memberRole && req.userId !== document.ownerId) {
      return res
        .status(403)
        .json({ error: "You don't have edit access to this document" });
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
// access other users docs etc endpoint

router.post("/:id/members", authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      error: "User not authenticated",
    });
  }

  const { email, role } = req.body as {
    email?: string;
    role?: "VIEWER" | "EDITOR";
  };

  if (!email || !role) {
    return res.status(400).json({
      error: "Email and role are required",
    });
  }

  if (role != "VIEWER" && role != "EDITOR") {
    return res.status(400).json({
      error: "Invalid role",
    });
  }

  if (typeof id !== "string") {
    return res.status(404).json({
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
      return res.status(403).json({
        error: "Only owner can share this document",
      });
    }

    const memberEmail = email?.trim().toLowerCase();
    const member = await prisma.user.findUnique({
      where: {
        email: memberEmail,
      },
    });

    if (!member) {
      return res.status(404).json({ error: "User not found" });
    }

    if (member.id === req.userId) {
      return res.status(400).json({ error: "You already own this document" });
    }

    const existingMember = await prisma.documentMember.findFirst({
      where: {
        documentId: id,
        userId: member.id,
      },
    });

    const membership = existingMember
      ? await prisma.documentMember.update({
          where: { id: existingMember.id },
          data: { role },
        })
      : await prisma.documentMember.create({
          data: { documentId: id, userId: member.id, role },
        });

    return res.status(200).json({ membership });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/:id/members", authMiddleware, async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({
      error: "User not authenticated",
    });
  }

  const { id: documentId } = req.params;

  if (typeof documentId !== "string") {
    return res.status(400).json({
      error: "Invalid document id type",
    });
  }

  try {
    const document = await prisma.document.findFirst({
      where: {
        ownerId: req.userId,
        id: documentId,
      },
    });

    if (!document) {
      return res.status(403).json({
        error: "Only owner can manage document",
      });
    }

    const members = await prisma.documentMember.findMany({
      where: {
        documentId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
      members,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.delete("/:id/members/:memberId", authMiddleware, async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({
      error: "User not authenticated",
    });
  }

  const { id: documentId, memberId } = req.params;

  if (typeof documentId !== "string") {
    return res.status(401).json({
      error: "Invalid document ID type",
    });
  }
  if (typeof memberId !== "string") {
    return res.status(401).json({
      error: "Invalid member ID type",
    });
  }

  try {
    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        ownerId: req.userId,
      },
    });
    if (!document) {
      return res.status(403).json({
        error: "Only the owner can remove member",
      });
    }

    const membership = await prisma.documentMember.findFirst({
      where: {
        id: memberId,
        documentId,
      },
    });

    if (!membership) {
      return res.status(404).json({
        error: "Member not found",
      });
    }

    await prisma.documentMember.delete({
      where: {
        id: membership.id,
      },
    });

    return res.status(200).json({
      message: "Member removed",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});
export default router;
