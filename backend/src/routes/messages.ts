import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";
import { messageBodySchema, messagePatchSchema } from "../lib/validation";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const parsed = messageBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const message = await prisma.message.create({ data: parsed.data });
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create message" });
  }
});

router.get("/", requireAdmin, async (_req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list messages" });
  }
});

router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const parsed = messagePatchSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const message = await prisma.message.update({
      where: { id: req.params.id },
      data: { isRead: parsed.data.isRead },
    });
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update message" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await prisma.message.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

export default router;
