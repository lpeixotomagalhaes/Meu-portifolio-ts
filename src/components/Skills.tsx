import { motion } from "framer-motion";
import prisma from "@/lib/prisma";

// IMPORTANTE: Removemos o "use client" do topo pois o Prisma só roda no Servidor.
export default async function Skills() {
  // Puxa as skills que você acabou de criar no painel Admin!
  const arsenal = await prisma.skill.findMany({ orderBy: { createdAt: 'asc' } });

  // Se não tiver nenhuma cadastrada, não mostra a seção
  if (arsenal.length === 0) return null;

  return (
    <section className="py-24 overflow-hidden border-t border-b border-zinc-900 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-16 text-white">
          Arsenal Tecnológico
        </h3>
        
        {/* A simetria automática mora aqui: cols-4 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {arsenal.map((item, index) => (
            <div key={item.id} className="relative group cursor-help flex justify-center">
              <div className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-sm md:text-base font-bold text-gray-300 group-hover:border-white group-hover:text-white transition-all shadow-lg flex items-center justify-center text-center">
                {item.name}
              </div>

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-5 bg-black/80 backdrop-blur-md border border-zinc-700 text-white rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-xl pointer-events-none transform group-hover:-translate-y-2 text-left">
                <span className="font-black block mb-2 text-base uppercase tracking-wider border-b border-zinc-700 pb-2">{item.name}</span>
                <span className="text-gray-300 leading-relaxed text-xs md:text-sm font-medium block mt-2">{item.description}</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-zinc-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}