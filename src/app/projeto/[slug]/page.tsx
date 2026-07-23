import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { fetchProjectBySlug } from "@/lib/data";

export default async function ProjetoDetalhe({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let projeto;
  try {
    projeto = await fetchProjectBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <section className="pt-32 min-h-[70vh] flex flex-col md:flex-row items-center border-b border-zinc-900">
        <div className="flex-1 px-6 md:px-24 py-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{projeto.title}</h1>
          <h2 className="text-2xl md:text-4xl font-serif italic text-gray-400 mb-8">
            {projeto.subtitle}
          </h2>
          <p className="text-gray-400 max-w-lg leading-relaxed text-sm md:text-base">
            {projeto.longDesc}
          </p>
        </div>

        <div className="flex-1 w-full h-[50vh] md:h-[70vh] bg-zinc-900 relative" />
      </section>

      <section className="min-h-[70vh] flex flex-col md:flex-row-reverse items-center">
        <div className="flex-1 px-6 md:px-24 py-12">
          <h3 className="text-4xl md:text-5xl font-bold mb-8">About Project</h3>
          <p className="text-gray-400 max-w-lg leading-relaxed text-sm md:text-base">
            {projeto.shortDesc}
          </p>
        </div>

        <div className="flex-1 w-full h-[50vh] md:h-[70vh] bg-zinc-800 relative" />
      </section>

      <Footer />
    </main>
  );
}
