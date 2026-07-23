import { motion } from "framer-motion";
import Image from "next/image";
import prisma from "@/lib/prisma";

export default async function About() {
  // Puxa as configurações dinâmicas salvadas no painel
  const settings = await prisma.setting.findUnique({ where: { id: "global" } });

  // Texto fallback caso você ainda não tenha preenchido nada nas configurações
  const defaultText1 = "Olá, sou Lucas Peixoto, estudante de Ciência da Computação na Universidade de Fortaleza (Unifor). Minha jornada é guiada pela busca constante de transformar conceitos lógicos em experiências digitais intuitivas.";
  const defaultText2 = "Atualmente, meu foco é desenvolver interfaces web de alta performance, utilizando animações fluidas e design responsivo para garantir que a experiência do usuário (UX) seja sempre o pilar central de qualquer projeto.";

  return (
    <section id="sobre" className="py-24 px-6 md:px-24 bg-zinc-950">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <h3 className="text-3xl md:text-5xl font-serif italic mb-8 leading-tight">
            Minha abordagem é <span className="font-sans font-bold not-italic text-white">lógica, organizada</span> & criativa.
          </h3>
          
          <div className="text-gray-400 text-base leading-relaxed space-y-5 whitespace-pre-line">
            {/* Se houver texto customizado no admin ele usa, caso contrário usa o padrão */}
            {settings?.aboutText ? (
              <p>{settings.aboutText}</p>
            ) : (
              <>
                <p>{defaultText1}</p>
                <p>{defaultText2}</p>
              </>
            )}
          </div>

          <button className="mt-8 border border-white px-6 py-3 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            Download CV
          </button>
        </div>
        
        <div className="flex-1 w-full max-w-sm aspect-[3/4] relative h-[400px] md:h-[450px]">
          <Image 
            src="/perfil.png" 
            alt="Lucas Peixoto" 
            fill 
            className="object-cover rounded-sm grayscale hover:grayscale-0 hover:scale-[1.02] hover:rotate-2 transition-all duration-500 shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}