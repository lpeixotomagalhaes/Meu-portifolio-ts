"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderKanban, Settings, Code2, Mail } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const links = [
    { name: "Visão Geral", href: "/admin", icon: LayoutDashboard },
    { name: "Mensagens", href: "/admin/mensagens", icon: Mail },   
    { name: "Projetos", href: "/admin/projetos", icon: FolderKanban },
    { name: "Skills", href: "/admin/skills", icon: Code2 },
    { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
  ];

  return (
    <motion.div
      // CORREÇÃO: Começa no top-0 e z-index 60. Mouse na logo = menu abre!
      className="fixed left-0 top-0 h-screen w-20 z-[60] flex"
      initial="collapsed"
      whileHover="expanded"
    >
      {/* HITBOX DA LOGO: Permite clicar na área superior esquerda para ir para a Home */}
      <Link href="/" className="absolute top-6 left-6 w-16 h-16 z-10" title="Ir para o Site Público" />

      <motion.aside 
        variants={{
          collapsed: { x: -260, opacity: 0 },
          expanded: { x: 0, opacity: 1 }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-64 bg-black/80 backdrop-blur-md border-r border-zinc-900/50 p-6 pt-32 flex flex-col justify-between shadow-2xl h-full rounded-r-2xl"
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-4">Navegação</h4>
            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                
                return (
                  <Link key={link.href} href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-wider uppercase transition-colors ${
                      isActive ? "bg-zinc-900/80 text-white border border-zinc-800" : "text-zinc-400 hover:text-white hover:bg-zinc-900/30"
                    }`}
                  >
                    <Icon size={18} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        <div className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase text-center border-t border-zinc-900/50 pt-4">
          LKZ Studio v1.0
        </div>
      </motion.aside>
    </motion.div>
  );
}