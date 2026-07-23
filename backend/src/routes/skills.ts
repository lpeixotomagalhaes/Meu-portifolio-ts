import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";
import { skillBodySchema } from "../lib/validation";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list skills" });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const parsed = skillBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const skill = await prisma.skill.create({ data: parsed.data });
    res.status(201).json(skill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create skill" });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const parsed = skillBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const skill = await prisma.skill.update({
      where: { id: req.params.id },
      data: parsed.data,
    });
    res.json(skill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update skill" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await prisma.skill.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete skill" });
  }
});

export default router;
