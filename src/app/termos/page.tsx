"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Header />
      <section className="pt-56 pb-24 px-6 md:px-24 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12"
        >
          Termos de Uso
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="space-y-8 text-gray-400 leading-relaxed"
        >
          <div>
            <h3 className="text-white font-bold text-xl mb-3">1. Aceitação dos Termos</h3>
            <p>Ao acessar e usar o portfólio de Lucas Peixoto (LKZ), você concorda em cumprir e ser vinculado por estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve usar nosso site.</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-3">2. Propriedade Intelectual</h3>
            <p>Todo o conteúdo deste site, incluindo mas não se limitando a códigos, designs, imagens, logos e textos, é de propriedade exclusiva de LKZ. A reprodução, distribuição ou uso comercial sem autorização prévia por escrito é estritamente proibida.</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-3">3. Limitação de Responsabilidade</h3>
            <p>Os projetos exibidos são demonstrações de habilidades técnicas e criativas. Não garantimos que o site estará sempre livre de erros ou interrupções, e não nos responsabilizamos por danos decorrentes do uso das informações aqui contidas.</p>
          </div>
          <p className="pt-8 border-t border-zinc-900 text-sm">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}