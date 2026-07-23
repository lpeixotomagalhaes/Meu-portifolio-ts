"use client";

import { createClient } from "@/lib/supabase/client";
import { api } from "@/lib/api";

async function getToken() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Not authenticated");
  return token;
}

export async function apiWithAuth<T>(
  path: string,
  options: { method?: string; body?: unknown } = {}
) {
  const token = await getToken();
  return api<T>(path, { ...options, token });
}
