import { Request, Response, NextFunction } from "express";
import { createSecretKey } from "crypto";
import { jwtVerify } from "jose";

export type AuthedRequest = Request & {
  user?: { sub: string; email?: string };
};

export async function requireAdmin(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }

    const token = header.slice("Bearer ".length).trim();
    const secret = process.env.SUPABASE_JWT_SECRET;
    if (!secret) {
      console.error("SUPABASE_JWT_SECRET is not set");
      return res.status(500).json({ error: "Server auth misconfigured" });
    }

    const key = createSecretKey(Buffer.from(secret, "utf-8"));
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    req.user = {
      sub: String(payload.sub),
      email: typeof payload.email === "string" ? payload.email : undefined,
    };

    return next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
