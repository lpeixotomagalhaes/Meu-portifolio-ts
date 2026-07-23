import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/stats", requireAdmin, async (_req, res) => {
  try {
    const [totalProjetos, totalSkills, mensagensNaoLidas] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.message.count({ where: { isRead: false } }),
    ]);
    res.json({ totalProjetos, totalSkills, mensagensNaoLidas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get stats" });
  }
});

export default router;
