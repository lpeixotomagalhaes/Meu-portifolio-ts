import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/supabase/server";
import type { AdminStats, Message, Project, Setting, Skill } from "@/lib/types";

export async function fetchProjects() {
  return api<Project[]>("/projects");
}

export async function fetchProjectBySlug(slug: string) {
  return api<Project>(`/projects/slug/${slug}`);
}

export async function fetchProjectById(id: string) {
  const token = await getAccessToken();
  return api<Project>(`/projects/id/${id}`, { token });
}

export async function fetchSkills() {
  return api<Skill[]>("/skills");
}

export async function fetchSettings() {
  return api<Setting | null>("/settings");
}

export async function fetchMessages() {
  const token = await getAccessToken();
  return api<Message[]>("/messages", { token });
}

export async function fetchAdminStats() {
  const token = await getAccessToken();
  return api<AdminStats>("/admin/stats", { token });
}
