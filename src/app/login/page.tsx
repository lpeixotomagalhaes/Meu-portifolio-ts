"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Email ou senha incorretos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-zinc-950 border border-zinc-900 p-10 rounded-2xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
            <Lock className="text-zinc-500" size={24} />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
            Área Restrita
          </h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium">
            Acesso exclusivo para LKZ
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@example.com"
              className={`w-full bg-black border ${
                error ? "border-red-500" : "border-zinc-800"
              } rounded-lg p-4 text-white focus:outline-none focus:border-white transition-colors text-sm`}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">
              Senha
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className={`w-full bg-black border ${
                error ? "border-red-500" : "border-zinc-800"
              } rounded-lg p-4 text-white focus:outline-none focus:border-white transition-colors text-sm`}
            />
            {error && (
              <p className="text-red-500 text-xs font-bold mt-2 ml-1">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm mt-4 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar no Painel"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
