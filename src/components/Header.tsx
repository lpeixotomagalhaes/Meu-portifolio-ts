"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full flex justify-between items-center p-6 md:px-12 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900/50">
      
      {/* Transformamos a Logo em um Link que leva para a Home */}
      <Link href="/" className="w-20 h-20 relative cursor-pointer hover:scale-120 transition-transform duration-300">
        <Image src="/logo-v2.png" alt="LKZ Logo" fill className="object-contain" priority />
      </Link>

      <nav className="hidden md:flex gap-8 text-xs md:text-sm font-bold tracking-widest text-gray-300">
        {/* Adicionado o / antes da hashtag para forçar a volta para a página inicial */}
        <Link href="/#sobre" className="hover:text-white transition-colors uppercase">Sobre mim</Link>
        <Link href="/#projetos" className="hover:text-white transition-colors uppercase">Projetos</Link>
        <Link href="/#contato" className="hover:text-white transition-colors uppercase">Contato</Link>
      </nav>
    </header>
  );
}