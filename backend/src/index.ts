import "dotenv/config";
import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects";
import skillsRouter from "./routes/skills";
import settingsRouter from "./routes/settings";
import messagesRouter from "./routes/messages";
import adminRouter from "./routes/admin";

const app = express();
const port = Number(process.env.PORT) || 4000;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: corsOrigin.split(",").map((o) => o.trim()),
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/projects", projectsRouter);
app.use("/skills", skillsRouter);
app.use("/settings", settingsRouter);
app.use("/messages", messagesRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
