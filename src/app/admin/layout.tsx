import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black pt-32">
      <AdminHeader />
      <AdminSidebar />
      {/* Adicionado um ml-12 de margem para o conteúdo não ficar embaixo da aba invisível do menu */}
      <main className="max-w-6xl mx-auto px-6 pb-24 ml-auto md:pl-12">
        {children}
      </main>
    </div>
  );
}