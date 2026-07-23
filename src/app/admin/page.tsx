import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchAdminStats } from "@/lib/data";

export default async function AdminDashboard() {
  let totalProjetos = 0;
  let totalSkills = 0;
  let mensagensNaoLidas = 0;

  try {
    const stats = await fetchAdminStats();
    totalProjetos = stats.totalProjetos;
    totalSkills = stats.totalSkills;
    mensagensNaoLidas = stats.mensagensNaoLidas;
  } catch {
    /* API offline or unauthorized */
  }

  return (
    <div className="w-full animate-in fade-in duration-500">
      <header className="mb-12 border-b border-zinc-900 pb-8">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
          Visão Geral
        </h1>
        <p className="text-zinc-500 font-medium">
          Bem-vindo de volta ao seu centro de controle, Lucas.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-xl shadow-lg flex flex-col justify-between">
          <div>
            <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">
              Projetos Publicados
            </h4>
            <p className="text-5xl font-black text-white">{totalProjetos}</p>
          </div>
          <Link
            href="/admin/projetos"
            className="text-emerald-500 text-xs font-bold uppercase tracking-widest mt-6 flex items-center gap-2 hover:text-emerald-400"
          >
            Gerenciar <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-xl shadow-lg flex flex-col justify-between">
          <div>
            <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">
              Skills Cadastradas
            </h4>
            <p className="text-5xl font-black text-white">{totalSkills}</p>
          </div>
          <Link
            href="/admin/skills"
            className="text-emerald-500 text-xs font-bold uppercase tracking-widest mt-6 flex items-center gap-2 hover:text-emerald-400"
          >
            Gerenciar <ArrowRight size={14} />
          </Link>
        </div>

        <div
          className={`border p-8 rounded-xl shadow-lg flex flex-col justify-between ${
            mensagensNaoLidas > 0
              ? "bg-emerald-950/20 border-emerald-900/50"
              : "bg-zinc-950 border-zinc-900"
          }`}
        >
          <div>
            <h4
              className={`text-xs font-bold uppercase tracking-widest mb-4 ${
                mensagensNaoLidas > 0 ? "text-emerald-500" : "text-zinc-500"
              }`}
            >
              Mensagens Não Lidas
            </h4>
            <p className="text-5xl font-black text-white">{mensagensNaoLidas}</p>
          </div>
          <Link
            href="/admin/mensagens"
            className="text-emerald-500 text-xs font-bold uppercase tracking-widest mt-6 flex items-center gap-2 hover:text-emerald-400"
          >
            Ver Caixa de Entrada <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
