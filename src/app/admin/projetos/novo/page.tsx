import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import { createProject } from "@/actions/admin";

export default function NovoProjeto() {
  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-12 border-b border-zinc-900 pb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <Link href="/admin/projetos" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Voltar para Projetos
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">Novo Projeto</h1>
        </div>
      </header>

      {/* Action conectada direto na função do backend */}
      <form action={createProject} className="space-y-8 bg-zinc-950 border border-zinc-900 p-8 md:p-12 rounded-xl shadow-2xl">
        <div className="space-y-6">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-zinc-900 pb-4">Informações Principais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Título do Projeto</label>
              <input type="text" name="title" required placeholder="Ex: Coffeetery Shop" className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Slug (URL)</label>
              <input type="text" name="slug" required placeholder="Ex: coffeetery-shop" className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Subtítulo (Especialidade)</label>
            <input type="text" name="subtitle" required placeholder="Ex: Branding and Web Design" className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
          </div>
        </div>

        <div className="space-y-6 pt-6">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-zinc-900 pb-4">Conteúdo Textual</h3>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Descrição Curta (Cards)</label>
            <textarea name="shortDesc" required rows={2} className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm resize-none"></textarea>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Descrição Longa (Página)</label>
            <textarea name="longDesc" required rows={4} className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm resize-none"></textarea>
          </div>
        </div>

        <div className="space-y-6 pt-6">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-zinc-900 pb-4">Mídia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1 flex items-center gap-2"><ImageIcon size={14} /> Imagem de Capa</label>
              <input type="text" name="coverImage" required placeholder="/projetos/capa.jpg" className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1 flex items-center gap-2"><ImageIcon size={14} /> Imagem About</label>
              <input type="text" name="aboutImage" required placeholder="/projetos/about.jpg" className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full flex justify-center items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-emerald-400 transition-colors shadow-lg mt-8">
          <Save size={18} /> Salvar Projeto no Banco
        </button>
      </form>
    </div>
  );
}