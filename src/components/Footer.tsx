"use client";
import { motion } from "framer-motion";
import { InstagramIcon, LinkedinIcon } from "./Icons";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSettings } from "@/actions/admin";

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    getSettings().then((data) => {
      if (data) setSettings(data);
    });
  }, []);
  return (
    <footer className="pt-24 pb-12 px-6 md:px-24 bg-black border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid Principal de Informações (4 Colunas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Coluna 1: Logo e Bio */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: false }} 
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="w-32 h-32 relative -ml-4">
              <Image src="/logo-v2.png" alt="LKZ Logo" fill className="object-contain" />
            </div>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium">
              Transformando lógica complexa em experiências digitais premium e responsivas.
            </p>
          </motion.div>

          {/* Coluna 2: Navegação */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: false }} 
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h5 className="text-white font-black text-xl mb-4 tracking-widest uppercase">Navegação</h5>
            <Link href="#sobre" className="text-gray-400 text-base md:text-lg hover:text-white transition-colors w-fit">Sobre mim</Link>
            <Link href="#projetos" className="text-gray-400 text-base md:text-lg hover:text-white transition-colors w-fit">Projetos</Link>
            <Link href="#contato" className="text-gray-400 text-base md:text-lg hover:text-white transition-colors w-fit">Contato</Link>
          </motion.div>

          {/* Coluna 3: Endereço */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: false }} 
            transition={{ delay: 0.3 }} 
            className="flex flex-col gap-4"
          >
            <h5 className="text-white font-black text-xl mb-4 tracking-widest uppercase">Localização</h5>
            <p className="text-gray-400 text-base md:text-lg cursor-default">Av. Washington Soares, 1321</p>
            <p className="text-gray-400 text-base md:text-lg cursor-default">Edson Queiroz</p>
            <p className="text-gray-400 text-base md:text-lg cursor-default">Fortaleza - CE, 60811-341</p>
          </motion.div>

          {/* Coluna 4: Contato */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: false }} 
            transition={{ delay: 0.4 }} 
            className="flex flex-col gap-4"
          >
            <h5 className="text-white font-black text-xl mb-4 tracking-widest uppercase">Contato</h5>
            <a href="tel:+5585987611445" className="text-gray-400 text-base md:text-lg hover:text-white transition-colors w-fit">+55 85 98761-1445</a>
            <a href="mailto:contato@lkzmagalhaes.com.br" className="text-gray-400 text-base md:text-lg hover:text-white transition-colors w-fit">contato@lkzmagalhaes.com.br</a>
            
           {/* Redes Sociais */}
            <div className="flex gap-6 mt-6">
              <a href={settings?.linkedinUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:-translate-y-2 transition-all duration-300">
                <LinkedinIcon size={32} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white hover:-translate-y-2 transition-all duration-300">
                <MessageCircle size={32} />
              </a>
              <a href={settings?.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:-translate-y-2 transition-all duration-300">
                <InstagramIcon size={32} />
              </a>
            
            </div>
          </motion.div>

        </div>

        {/* Barra Inferior (Direitos Autorais) */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: false }} 
          transition={{ delay: 0.6 }} 
          className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 pt-8 border-t border-zinc-900"
        >
          <p className="mb-4 md:mb-0 font-medium tracking-wide">© {new Date().getFullYear()} LKZ. Todos os direitos reservados.</p>
          <div className="flex gap-8 font-medium tracking-wide">
            <a href="/termos" className="hover:text-gray-300 transition-colors">Termos de Uso</a>
            <a href="/privacidade" className="hover:text-gray-300 transition-colors">Política de Privacidade</a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}