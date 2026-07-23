import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";
import { z } from "zod";

const router = Router();

const settingsBodySchema = z.object({
  aboutText: z.string(),
  email: z.string(),
  phone: z.string(),
  linkedinUrl: z.string(),
  instagramUrl: z.string(),
  cvUrl: z.string().nullable().optional(),
});

router.get("/", async (_req, res) => {
  try {
    const settings = await prisma.setting.findUnique({ where: { id: "global" } });
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get settings" });
  }
});

router.put("/", requireAdmin, async (req, res) => {
  try {
    const parsed = settingsBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const data = {
      aboutText: parsed.data.aboutText,
      email: parsed.data.email,
      phone: parsed.data.phone,
      linkedinUrl: parsed.data.linkedinUrl,
      instagramUrl: parsed.data.instagramUrl,
      cvUrl: parsed.data.cvUrl ?? null,
    };
    const settings = await prisma.setting.upsert({
      where: { id: "global" },
      update: data,
      create: { id: "global", ...data },
    });
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update settings" });
  }
});

export default router;
