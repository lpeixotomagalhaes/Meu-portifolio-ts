import Link from "next/link";
import { fetchProjects } from "@/lib/data";

export default async function Projects() {
  let projetos: Awaited<ReturnType<typeof fetchProjects>> = [];

  try {
    projetos = (await fetchProjects()).slice(0, 3);
  } catch {
    projetos = [];
  }

  return (
    <section id="projetos" className="py-24 px-6 md:px-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-12">My Projects</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-10">
          {projetos.map((proj) => (
            <Link href={`/projeto/${proj.slug}`} key={proj.id}>
              <div className="group cursor-pointer flex flex-col gap-3">
                <div className="w-full aspect-[4/3] bg-zinc-800 rounded-sm transition-transform duration-500 group-hover:scale-105 overflow-hidden relative" />
                <h4 className="text-center text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {proj.title}
                </h4>
                <p className="text-zinc-500 text-xs text-center px-4 line-clamp-2">
                  {proj.shortDesc}
                </p>
              </div>
            </Link>
          ))}

          {projetos.length === 0 && (
            <p className="text-zinc-500 text-sm text-center col-span-full">
              Nenhum projeto publicado no banco de dados.
            </p>
          )}
        </div>

        <Link
          href="/projetos"
          className="border border-white px-6 py-3 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
        >
          Ver mais projetos
        </Link>
      </div>
    </section>
  );
}
