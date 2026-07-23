import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { logout } from "@/actions/auth"; // Importe a ação

export default function AdminHeader() {
  return (
    <header className="fixed top-0 w-full flex justify-between items-center p-6 md:px-12 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900/50">
      <div className="flex items-center gap-4">
        <Link href="/" className="w-16 h-16 relative cursor-pointer hover:scale-110 transition-transform duration-300">
          <Image src="/logo-v2.png" alt="LKZ Logo" fill className="object-contain" priority />
        </Link>
        <span className="text-zinc-500 font-bold tracking-widest uppercase text-sm border-l border-zinc-800 pl-4 hidden md:block">Admin Panel</span>
      </div>

      {/* Formulário para rodar a ação de Logout e ir pra Home */}
      <form action={logout}>
        <button type="submit" className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors uppercase font-bold text-xs md:text-sm tracking-widest">
          <LogOut size={16} /> Sair
        </button>
      </form>
    </header>
  );
}