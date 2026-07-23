"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- PROJETOS ---
export async function createProject(formData: FormData) {
  await prisma.project.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("slug") as string).toLowerCase().replace(/\s+/g, '-'),
      subtitle: formData.get("subtitle") as string,
      shortDesc: formData.get("shortDesc") as string,
      longDesc: formData.get("longDesc") as string,
      coverImage: formData.get("coverImage") as string,
      aboutImage: formData.get("aboutImage") as string,
    }
  });
  revalidatePath("/admin/projetos");
  revalidatePath("/projetos");
  revalidatePath("/");
  redirect("/admin/projetos");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projetos");
  revalidatePath("/projetos");
}

// --- SKILLS ---
export async function createSkill(formData: FormData) {
  await prisma.skill.create({
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    }
  });
  revalidatePath("/admin/skills");
  revalidatePath("/");
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/admin/skills");
  revalidatePath("/");
}
// --- CONFIGURAÇÕES ---
export async function updateSettings(formData: FormData) {
  // Captura os dados de forma segura (fallback para string vazia se for null)
  const data = {
    aboutText: (formData.get("aboutText") as string) || "",
    email: (formData.get("email") as string) || "",
    phone: (formData.get("phone") as string) || "",
    linkedinUrl: (formData.get("linkedinUrl") as string) || "",
    instagramUrl: (formData.get("instagramUrl") as string) || "",
  };

  await prisma.setting.upsert({
    where: { id: "global" },
    update: data,
    create: {
      id: "global",
      ...data
    }
  });
  
  revalidatePath("/");
  revalidatePath("/admin/configuracoes");
}
export async function updateProject(id: string, formData: FormData) {
  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("slug") as string).toLowerCase().replace(/\s+/g, '-'),
      subtitle: formData.get("subtitle") as string,
      shortDesc: formData.get("shortDesc") as string,
      longDesc: formData.get("longDesc") as string,
      coverImage: formData.get("coverImage") as string,
      aboutImage: formData.get("aboutImage") as string,
    }
  });
  revalidatePath("/admin/projetos");
  revalidatePath("/projetos");
  revalidatePath("/");
  redirect("/admin/projetos");
}

export async function updateSkill(id: string, formData: FormData) {
  await prisma.skill.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    }
  });
  revalidatePath("/admin/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}
export async function getSettings() {
  return await prisma.setting.findUnique({ where: { id: "global" } });
}