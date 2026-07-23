import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { fetchProjects } from "@/lib/data";

export default async function ProjetosPage() {
  let projetos: Awaited<ReturnType<typeof fetchProjects>> = [];

  try {
    projetos = await fetchProjects();
  } catch {
    projetos = [];
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <section className="pt-40 pb-24 px-6 md:px-24 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-20">My Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projetos.map((proj) => (
            <Link href={`/projeto/${proj.slug}`} key={proj.id}>
              <div className="group cursor-pointer flex flex-col gap-4">
                <div className="w-full aspect-[4/3] bg-zinc-900 rounded-sm transition-transform duration-500 group-hover:scale-105" />
                <h4 className="text-center text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
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
              Nenhum projeto publicado ainda.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
