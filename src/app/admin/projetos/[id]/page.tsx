"use client";

import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiWithAuth } from "@/lib/api-client";
import type { Project } from "@/lib/types";

export default function EditarProjeto() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [projeto, setProjeto] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiWithAuth<Project>(`/projects/id/${params.id}`)
      .then(setProjeto)
      .catch(() => router.push("/admin/projetos"));
  }, [params.id, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!projeto) return;
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);

    try {
      await apiWithAuth(`/projects/${projeto.id}`, {
        method: "PUT",
        body: {
          title: form.get("title"),
          slug: form.get("slug"),
          subtitle: form.get("subtitle"),
          shortDesc: form.get("shortDesc"),
          longDesc: form.get("longDesc"),
          coverImage: form.get("coverImage"),
          aboutImage: form.get("aboutImage"),
        },
      });
      router.push("/admin/projetos");
      router.refresh();
    } catch {
      setError("Falha ao atualizar o projeto.");
      setLoading(false);
    }
  }

  if (!projeto) {
    return <p className="text-zinc-500">Carregando projeto...</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in duration-500">
      <header className="mb-12 border-b border-zinc-900 pb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <Link
            href="/admin/projetos"
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Voltar para Projetos
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
            Editar Projeto
          </h1>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-zinc-950 border border-zinc-900 p-8 md:p-12 rounded-xl shadow-2xl"
      >
        <div className="space-y-6">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-zinc-900 pb-4">
            Informações Principais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">
                Título
              </label>
              <input
                type="text"
                name="title"
                required
                defaultValue={projeto.title}
                className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                required
                defaultValue={projeto.slug}
                className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">
              Subtítulo
            </label>
            <input
              type="text"
              name="subtitle"
              required
              defaultValue={projeto.subtitle}
              className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-6 pt-6">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-zinc-900 pb-4">
            Textos
          </h3>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">
              Descrição Curta
            </label>
            <textarea
              name="shortDesc"
              required
              rows={2}
              defaultValue={projeto.shortDesc}
              className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white text-sm resize-none focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">
              Descrição Longa
            </label>
            <textarea
              name="longDesc"
              required
              rows={4}
              defaultValue={projeto.longDesc}
              className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white text-sm resize-none focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-6 pt-6">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-zinc-900 pb-4">
            Imagens
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1 flex items-center gap-2">
                <ImageIcon size={14} /> Capa (URL)
              </label>
              <input
                type="text"
                name="coverImage"
                required
                defaultValue={projeto.coverImage || ""}
                className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1 flex items-center gap-2">
                <ImageIcon size={14} /> About (URL)
              </label>
              <input
                type="text"
                name="aboutImage"
                required
                defaultValue={projeto.aboutImage || ""}
                className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-emerald-400 mt-8 transition-colors disabled:opacity-60"
        >
          <Save size={18} /> {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}
