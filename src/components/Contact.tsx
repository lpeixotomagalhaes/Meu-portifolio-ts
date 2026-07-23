"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { submitContact } from "@/actions/messages";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Interceptamos o form para mostrar a tela de sucesso sem recarregar a página
  const handleAction = async (formData: FormData) => {
    await submitContact(formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000); // Volta ao normal depois de 5s
  };

  return (
    <section id="contato" className="py-24 px-6 md:px-24 flex flex-col gap-12 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }} className="w-full text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">Tem uma ideia?</h2>
        <h2 className="text-3xl md:text-4xl font-serif italic text-gray-500">Vamos construir juntos.</h2>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12 items-center w-full">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} className="flex-1 w-full aspect-[4/5] relative h-[400px] md:h-[450px]">
          <Image src="/tablet.png" alt="Designing on Tablet" fill className="object-cover rounded-sm" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} className="flex-1 flex flex-col justify-center w-full min-h-[400px]">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-500 bg-zinc-950 border border-zinc-900 p-12 rounded-xl">
              <CheckCircle size={64} className="text-emerald-500 mb-4" />
              <h3 className="text-2xl font-bold text-white">Mensagem Enviada!</h3>
              <p className="text-zinc-400 text-sm">Obrigado pelo contato. Retornarei o mais breve possível.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">Preencha o formulário e entrarei em contato</h3>
              <form action={handleAction} className="space-y-6">
                <input type="text" name="name" required placeholder="Nome completo*" className="w-full bg-transparent border-b border-gray-500 pb-2 focus:outline-none focus:border-white transition-colors text-sm text-white" />
                <input type="email" name="email" required placeholder="Email*" className="w-full bg-transparent border-b border-gray-500 pb-2 focus:outline-none focus:border-white transition-colors text-sm text-white" />
                <input type="text" name="company" required placeholder="Empresa*" className="w-full bg-transparent border-b border-gray-500 pb-2 focus:outline-none focus:border-white transition-colors text-sm text-white" />
                <input type="text" name="content" required placeholder="Como posso lhe ajudar?*" className="w-full bg-transparent border-b border-gray-500 pb-2 focus:outline-none focus:border-white transition-colors text-sm text-white" />
                <label className="flex items-center gap-3 text-xs md:text-sm text-gray-400 mt-4 cursor-pointer">
                  <input type="checkbox" required className="w-4 h-4 accent-white bg-black border-gray-500" />
                  Eu li e concordo com a política de privacidade.
                </label>
                <button type="submit" className="w-full bg-white text-black font-bold py-3 mt-6 hover:bg-gray-200 transition-colors uppercase text-xs tracking-widest">Enviar</button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}