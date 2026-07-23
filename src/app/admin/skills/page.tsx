import prisma from "@/lib/prisma";
import { createSkill, deleteSkill } from "@/actions/admin";
import { Trash2, Plus } from "lucide-react";

export default async function AdminSkills() {
  const skills = await prisma.skill.findMany({ orderBy: { createdAt: 'asc' } });

  return (
    <div className="w-full animate-in fade-in duration-500">
      <header className="mb-12 border-b border-zinc-900 pb-8">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">Skills</h1>
        <p className="text-zinc-500 font-medium">Gerencie seu arsenal tecnológico ({skills.length} cadastradas).</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lado Esquerdo: Formulário */}
        <div className="lg:col-span-1 bg-zinc-950 border border-zinc-900 p-6 rounded-xl h-fit">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-zinc-900 pb-4 mb-6">Nova Skill</h3>
          <form action={createSkill} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Nome da Tecnologia</label>
              <input type="text" name="name" required placeholder="Ex: React Native" className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Descrição Curta</label>
              <textarea name="description" required rows={3} placeholder="Explicação para leigos..." className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm resize-none"></textarea>
            </div>
            <button type="submit" className="w-full flex justify-center items-center gap-2 bg-white text-black py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors mt-4">
              <Plus size={16} /> Adicionar Skill
            </button>
          </form>
        </div>

        {/* Lado Direito: Listagem */}
        <div className="lg:col-span-2 space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-zinc-950 border border-zinc-900 p-4 rounded-lg flex justify-between items-center group">
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wider">{skill.name}</h4>
                <p className="text-zinc-500 text-xs mt-1">{skill.description}</p>
              </div>
              <form action={async () => { "use server"; await deleteSkill(skill.id); }}>
                <button type="submit" className="text-zinc-600 hover:text-red-500 p-2 transition-colors">
                  <Trash2 size={18} />
                </button>
              </form>
            </div>
          ))}
          {skills.length === 0 && <p className="text-zinc-500 text-sm">Nenhuma skill adicionada.</p>}
        </div>
      </div>
    </div>
  );
}