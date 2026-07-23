"use client";

import { Mail, MailOpen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { apiWithAuth } from "@/lib/api-client";
import type { Message } from "@/lib/types";

export default function AdminMensagens() {
  const [messages, setMessages] = useState<Message[]>([]);

  async function load() {
    try {
      const data = await apiWithAuth<Message[]>("/messages");
      setMessages(data);
    } catch {
      setMessages([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(id: string, isRead: boolean) {
    await apiWithAuth(`/messages/${id}`, {
      method: "PATCH",
      body: { isRead: !isRead },
    });
    await load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir esta mensagem?")) return;
    await apiWithAuth(`/messages/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="w-full animate-in fade-in duration-500">
      <header className="mb-12 border-b border-zinc-900 pb-8">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
          Mensagens
        </h1>
        <p className="text-zinc-500 font-medium">
          Você tem {messages.filter((m) => !m.isRead).length} mensagens não lidas.
        </p>
      </header>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-6 rounded-xl border flex flex-col md:flex-row gap-6 justify-between items-start md:items-center transition-all ${
              msg.isRead
                ? "bg-zinc-950 border-zinc-900 opacity-70"
                : "bg-zinc-900/50 border-zinc-700 shadow-lg"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {msg.isRead ? (
                  <MailOpen size={16} className="text-zinc-500" />
                ) : (
                  <Mail size={16} className="text-emerald-500" />
                )}
                <h4
                  className={`text-sm uppercase tracking-widest ${
                    msg.isRead ? "text-zinc-400" : "text-white font-bold"
                  }`}
                >
                  {msg.name}{" "}
                  <span className="text-zinc-600 normal-case tracking-normal ml-2">
                    ({msg.company})
                  </span>
                </h4>
              </div>
              <a
                href={`mailto:${msg.email}`}
                className="text-emerald-500 text-xs font-bold hover:underline"
              >
                {msg.email}
              </a>
              <p className="text-zinc-300 text-sm mt-4 bg-black/50 p-4 rounded-lg border border-zinc-800">
                {msg.content}
              </p>
              <p className="text-zinc-600 text-xs mt-3">
                {new Date(msg.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>

            <div className="flex gap-3 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => toggleRead(msg.id, msg.isRead)}
                className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded border border-zinc-800 hover:bg-zinc-800 transition-colors"
              >
                {msg.isRead ? "Marcar como Não Lido" : "Marcar como Lido"}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(msg.id)}
                className="text-red-500 hover:text-red-400 p-2 border border-zinc-800 rounded hover:border-red-500/50 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-12 text-center">
            <Mail size={48} className="text-zinc-800 mx-auto mb-4" />
            <p className="text-zinc-500 text-sm font-medium">
              Sua caixa de entrada está vazia.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
