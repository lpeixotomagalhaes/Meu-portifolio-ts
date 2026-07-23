"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { use } from "react";

// Em versões recentes do Next.js, os params são uma Promise que precisamos desempacotar
export default async function ProjetoDetalhe({ params }: { params: Promise<{ slug: string }> }) {
  // Desempacotando o slug de forma segura
  
 const { slug } = await params;

  const projetoInfo = {
    titulo: slug.replace("-", " ").toUpperCase(), 
    subtitulo: "Branding and Logo Design",
    descricao: "Lorem ipsum lakis reskade, ybörer sâsom belening. Labiledes. Nân. Tlogi geosamma erogir. Nylig äpp nyv alltsâ dipângen fyledes. Lagisk tebel dinar, hynade. Dokin onat ysk, besamma, saligt.",
    about: "Lorem ipsum lakis reskade, ybörer sâsom belening. Labiledes. Nân. Tlogi geosamma erogir. Nylig äpp nyv alltsâ dipângen fyledes."
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      
      <section className="pt-32 min-h-[70vh] flex flex-col md:flex-row items-center border-b border-zinc-900">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 px-6 md:px-24 py-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{projetoInfo.titulo}</h1>
          <h2 className="text-2xl md:text-4xl font-serif italic text-gray-400 mb-8">{projetoInfo.subtitulo}</h2>
          <p className="text-gray-400 max-w-lg leading-relaxed text-sm md:text-base">
            {projetoInfo.descricao}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 w-full h-[50vh] md:h-[70vh] bg-zinc-900 relative"
        >
          {/* Imagem do projeto */}
        </motion.div>
      </section>

      <section className="min-h-[70vh] flex flex-col md:flex-row-reverse items-center">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="flex-1 px-6 md:px-24 py-12"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-8">About Project</h3>
          <p className="text-gray-400 max-w-lg leading-relaxed text-sm md:text-base">
            {projetoInfo.about}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="flex-1 w-full h-[50vh] md:h-[70vh] bg-zinc-800 relative"
        >
          {/* Imagem secundária */}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}