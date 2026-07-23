"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Header />
      <section className="pt-56 pb-24 px-6 md:px-24 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12"
        >
          Política de Privacidade
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="space-y-8 text-gray-400 leading-relaxed"
        >
          <div>
            <h3 className="text-white font-bold text-xl mb-3">1. Coleta de Informações</h3>
            <p>Coletamos informações fornecidas voluntariamente por você através do nosso formulário de contato, como nome, e-mail e dados da empresa. Estes dados são utilizados exclusivamente para fins de comunicação e orçamento.</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-3">2. Uso dos Dados</h3>
            <p>Os dados coletados não serão vendidos, trocados, transferidos ou dados a qualquer outra empresa por qualquer motivo, sem o seu consentimento, exceto para o propósito expresso de entregar o serviço solicitado.</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-3">3. Proteção e Segurança</h3>
            <p>Implementamos uma variedade de medidas de segurança para manter a proteção de suas informações pessoais. O acesso aos dados é restrito e monitorado.</p>
          </div>
          <p className="pt-8 border-t border-zinc-900 text-sm">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}