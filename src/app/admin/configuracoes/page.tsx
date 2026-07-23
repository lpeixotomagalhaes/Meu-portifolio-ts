import { Save } from "lucide-react";
import prisma from "@/lib/prisma";
import { updateSettings } from "@/actions/admin";

export default async function AdminConfiguracoes() {
  // Puxa do banco
  const rawSettings = await prisma.setting.findUnique({ where: { id: "global" } });

  // RESOLUÇÃO DO BUG: Convertemos para um objeto simples com strings primitivas para evitar o erro de passagem
  const settings = rawSettings ? {
    aboutText: rawSettings.aboutText || "",
    email: rawSettings.email || "",
    phone: rawSettings.phone || "",
    linkedinUrl: rawSettings.linkedinUrl || "",
    instagramUrl: rawSettings.instagramUrl || "",
  } : {
    aboutText: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    instagramUrl: ""
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in duration-500">
      <header className="mb-12 border-b border-zinc-900 pb-8">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">Configurações</h1>
        <p className="text-zinc-500 font-medium">Altere as informações globais do seu portfólio.</p>
      </header>

      <form action={updateSettings} className="space-y-8 bg-zinc-950 border border-zinc-900 p-8 md:p-12 rounded-xl shadow-2xl">
        <div className="space-y-6">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-zinc-900 pb-4">Sobre Mim</h3>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Texto de Abordagem Profissional</label>
            <textarea 
              name="aboutText" 
              defaultValue={settings.aboutText} 
              rows={4}
              placeholder="Olá, sou Lucas Peixoto..." 
              className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm resize-none"
            />
          </div>
        </div>

        <div className="space-y-6 pt-6">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm border-b border-zinc-900 pb-4">Contatos e Redes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">E-mail Profissional</label>
              <input type="email" name="email" defaultValue={settings.email} placeholder="contato@lkzmagalhaes.com.br" className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Telefone / WhatsApp</label>
              <input type="text" name="phone" defaultValue={settings.phone} placeholder="+55 85 98761-1445" className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Link do LinkedIn</label>
              <input type="url" name="linkedinUrl" defaultValue={settings.linkedinUrl} placeholder="https://linkedin.com/in/..." className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Link do Instagram</label>
              <input type="url" name="instagramUrl" defaultValue={settings.instagramUrl} placeholder="https://instagram.com/..." className="w-full bg-black border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full flex justify-center items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10">
          <Save size={18} /> Salvar Alterações Globais
        </button>
      </form>
    </div>
  );
}