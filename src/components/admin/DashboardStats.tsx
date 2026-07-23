"use client";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl">
        <h4 className="text-zinc-400 text-sm font-medium mb-2">Acessos no Portfólio</h4>
        <p className="text-3xl font-bold text-white">1,204</p>
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl">
        <h4 className="text-zinc-400 text-sm font-medium mb-2">Projetos Publicados</h4>
        <p className="text-3xl font-bold text-white">4</p>
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl">
        <h4 className="text-zinc-400 text-sm font-medium mb-2">Novas Mensagens</h4>
        <p className="text-3xl font-bold text-white">2</p>
      </div>
    </div>
  );
}