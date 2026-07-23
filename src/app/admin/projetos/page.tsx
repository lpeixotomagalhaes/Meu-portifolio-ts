import Link from "next/link";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { deleteProject } from "@/actions/admin";

export default async function AdminProjetos() {
  // Puxando os projetos REAIS do banco de dados
  const projetos = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="w-full animate-in fade-in duration-500">
      <header className="mb-12 border-b border-zinc-900 pb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">Projetos</h1>
          <p className="text-zinc-500 font-medium">Você tem {projetos.length} projetos publicados.</p>
        </div>
        <Link href="/admin/projetos/novo" className="flex items-center gap-2 bg-white text-black px-6 py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors shadow-lg">
          <PlusCircle size={18} /> Novo Projeto
        </Link>
      </header>

      <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/20">
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-zinc-500">Projeto</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-zinc-500 hidden md:table-cell">Slug</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-zinc-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map((projeto) => (
              <tr key={projeto.id} className="border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors group">
                <td className="p-6 font-bold text-white">{projeto.title}</td>
                <td className="p-6 text-zinc-400 text-sm hidden md:table-cell">/{projeto.slug}</td>
                <td className="p-6 flex justify-end gap-4 items-center">
                  {/* Botão de Editar Projeto */}
                  <Link href={`/admin/projetos/${projeto.id}`} className="text-zinc-500 hover:text-emerald-500 transition-colors" title="Editar Projeto">
                    <Edit size={18} />
                  </Link>

                  {/* Botão de Excluir Projeto */}
                  <form action={async () => { "use server"; await deleteProject(projeto.id); }}>
                    <button type="submit" className="text-zinc-500 hover:text-red-500 transition-colors mt-1" title="Excluir">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {projetos.length === 0 && (
              <tr><td colSpan={3} className="p-8 text-center text-zinc-500">Nenhum projeto cadastrado ainda.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}