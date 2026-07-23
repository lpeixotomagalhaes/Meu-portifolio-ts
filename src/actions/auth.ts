"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (password === adminPassword) {
    // RESOLUÇÃO DO BUG: No Next.js moderno, a chamada ao cookie jar precisa ser resolvida de forma assíncrona
    const cookieStore = await cookies();
    
    cookieStore.set("admin_session", "true", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", // Mais seguro em produção
      maxAge: 60 * 60 * 24, // 1 dia
      path: "/", // Garante escopo global no domínio
    });
    
    redirect("/admin");
  } else {
    redirect("/login?error=true");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/"); 
}