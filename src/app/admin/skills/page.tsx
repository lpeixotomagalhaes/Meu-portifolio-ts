"use client";

import { Trash2, Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { apiWithAuth } from "@/lib/api-client";
import type { Skill } from "@/lib/types";

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const data = await apiWithAuth<Skill[]>("/skills");
      setSkills(data);
    } catch {
      setSkills([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await apiWithAuth("/skills", {
        method: "POST",
        body: {
          name: data.get("name"),
          description: data.get("description"),
        },
      });
      form.reset();
      await load();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir esta skill?")) return;
    await apiWithAuth(`/skills/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="w-full animate-in fade-in duration-500">
      <header className="mb-12 border-b border-zinc-900 pb-8">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
          Skills
        </h1>
        <p className="text-zinc-500 font-medium">
          Gerencie seu arsenal tecnológico ({skills.length} cadastradas).
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-zinc-950 border border-zinc-900 p-6 rounded-xl h-fit">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-zinc-900 pb-4 mb-6">
            Nova Skill
          </h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">
                Nome da Tecnologia
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Ex: React Native"
                className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">
                Descrição Curta
              </label>
              <textarea
                name="description"
                required
                rows={3}
                placeholder="Explicação para leigos..."
                className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-white text-black py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors mt-4 disabled:opacity-60"
            >
              <Plus size={16} /> Adicionar Skill
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-zinc-950 border border-zinc-900 p-4 rounded-lg flex justify-between items-center group"
            >
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wider">
                  {skill.name}
                </h4>
                <p className="text-zinc-500 text-xs mt-1">{skill.description}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(skill.id)}
                className="text-zinc-600 hover:text-red-500 p-2 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="text-zinc-500 text-sm">Nenhuma skill adicionada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
