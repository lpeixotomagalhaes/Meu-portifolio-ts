"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjetosPage() {
  const todosProjetos = [
    { nome: "Coffeetery Shop", slug: "coffeetery-shop" },
    { nome: "Puppies Shelter", slug: "puppies-shelter" },
    { nome: "TBeauty", slug: "tbeauty" },
    { nome: "Le Hair", slug: "le-hair" },
    { nome: "Tech Corp", slug: "tech-corp" },
    { nome: "Urban Kicks", slug: "urban-kicks" }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      
      <section className="pt-40 pb-24 px-6 md:px-24 max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-20"
        >
          My Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {todosProjetos.map((proj, i) => (
            <Link href={`/projeto/${proj.slug}`} key={i}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer flex flex-col gap-4"
              >
                <div className="w-full aspect-[4/3] bg-zinc-900 rounded-sm transition-transform duration-500 group-hover:scale-105">
                  {/* Imagem do projeto entra aqui */}
                </div>
                <h4 className="text-center text-lg font-medium text-gray-300 group-hover:text-white transition-colors">{proj.nome}</h4>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}