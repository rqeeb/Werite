import { Router } from "express";

const router = Router();

router.get("/signup", (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});

export default router;
