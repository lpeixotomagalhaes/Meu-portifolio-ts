"use client";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function Hero() {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-24 gap-12 pt-32 pb-12 overflow-hidden z-10 pointer-events-none">
      
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10 pointer-events-auto"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: { 
                enable: true, 
                mode: "repulse",
              },
            },
            modes: {
              repulse: { 
                distance: 80, 
                duration: 0.4, 
                factor: 60, 
                speed: 1 
              },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: false },
            move: { 
              enable: true, 
              speed: 1.5, 
              direction: "none", 
              random: true, 
              outModes: { default: "bounce" } 
            },
            number: { density: { enable: true, width: 800, height: 800 }, value: 250 }, 
            opacity: { value: { min: 0.1, max: 0.6 }, animation: { enable: true, speed: 1, sync: false } },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 }, animation: { enable: true, speed: 2, sync: false } },
          },
          detectRetina: true,
        }}
      />
      
      <div className="max-w-2xl flex-1 pointer-events-auto z-10">
        <motion.h1 
          initial={{ opacity: 0, x: -200 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
          viewport={{ once: false }}
          className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 mt-8 md:mt-0"
        >
          <TypeAnimation
            sequence={[
              'O DEVELOPER',
              1000,
            ]}
            wrapper="span"
            speed={40}
            cursor={true}
            repeat={0} 
          />
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, x: 200 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          viewport={{ once: false }}
          className="text-3xl md:text-5xl font-serif italic text-gray-400 mb-10"
        >
          que você estava procurando!
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: false }}
          className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
        >
          <Link href="/#contato" className="bg-white text-black px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors">
            Fale comigo
          </Link>
          <Link href="/#projetos" className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
            Meus Projetos <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className="flex-1 w-full max-w-sm md:max-w-md aspect-[4/5] relative h-[450px] pointer-events-auto z-10"
      >
        <Image 
          src="/sketches.png" 
          alt="Interface Mockups and Sketches" 
          fill 
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          priority
        />
      </motion.div>
      
    </section>
  );
}