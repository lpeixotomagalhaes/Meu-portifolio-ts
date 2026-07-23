"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContact(formData: FormData) {
  await prisma.message.create({
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      content: formData.get("content") as string,
    }
  });
  revalidatePath("/admin/mensagens");
  revalidatePath("/admin");
}

export async function toggleReadStatus(id: string, currentStatus: boolean) {
  await prisma.message.update({
    where: { id },
    data: { isRead: !currentStatus }
  });
  revalidatePath("/admin/mensagens");
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin/mensagens");
  revalidatePath("/admin");
}