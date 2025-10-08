import { useEffect, useRef, useState, KeyboardEvent } from "react";
import {
  Send,
  Trash2,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { useChat } from "../../hooks/useChat";
import gliaLogo from "../../assets/logo_glia-removebg-preview.png";

function cls(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function ChatLayoutLikeGPT() {
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Usar o hook personalizado para gerenciar o chat
  const { messages, isLoading, sendMessage, clearMessages } = useChat();

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  // Foco inicial na textarea
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    await sendMessage(text);
  }

  function handleClear() {
    clearMessages();
    setInput("");
    inputRef.current?.focus();
  }

  async function handleCopy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <div className="h-dvh w-full bg-neutral-50 text-neutral-900 flex flex-col">
      {/* HEADER CENTRALIZADO */}
      <header className="sticky top-0 z-10 h-14 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 border-b border-neutral-200">
        <div className="h-full mx-auto max-w-4xl px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={gliaLogo} alt="GLIA" className="h-8 w-8 object-contain" />
            <span className="font-medium">GLIA Chat</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-neutral-200 bg-white hover:bg-neutral-100 text-sm"
              title="Limpar conversa"
            >
              <Trash2 className="size-4" />
              Limpar
            </button>
          </div>
        </div>
      </header>

      {/* LISTA DE MENSAGENS CENTRALIZADA */}
      <main
        ref={listRef}
        className="flex-1 overflow-auto mx-auto max-w-4xl w-full px-4 py-4"
      >
        <div className="space-y-4">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={cls(
                  "flex items-start gap-3",
                  isUser ? "justify-end" : "justify-start"
                )}
              >
                {/* Avatar GLIA */}
                {!isUser && (
                  <div className="shrink-0 mt-1">
                    <img src={gliaLogo} alt="GLIA" className="h-6 w-6 object-contain" />
                  </div>
                )}

                {/* Texto simples sem balão */}
                <div className="max-w-[80%]">
                  <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
                    {m.content}
                  </div>
                  <div className="flex items-center gap-2 mt-1 opacity-70">
                    <button
                      onClick={() => handleCopy(m.id, m.content)}
                      className="inline-flex items-center gap-1 text-xs hover:opacity-100"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="size-3.5" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Avatar do usuário */}
                {isUser && (
                  <div className="shrink-0 mt-1">
                    <div className="size-6 rounded-full bg-neutral-200 flex items-center justify-center">
                      <span className="text-[10px] font-medium text-neutral-700">Você</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Indicador de digitando… */}
          {isLoading && (
            <div className="flex items-center gap-3">
              <img src={gliaLogo} alt="GLIA" className="h-6 w-6 object-contain" />
              <div className="text-[15px]">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce [animation-delay:-0.2s]">•</span>
                  <span className="animate-bounce [animation-delay:-0.1s]">•</span>
                  <span className="animate-bounce">•</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER / TEXTAREA CENTRALIZADA */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-4xl w-full px-4 py-3">
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="p-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Digite sua mensagem…"
                className="w-full resize-none outline-none bg-transparent px-3 py-2 placeholder:text-neutral-400"
              />
            </div>
            <div className="px-3 pb-2 flex items-center justify-between text-xs text-neutral-500">
              <span>Enter para enviar • Shift+Enter para quebrar linha</span>
              <button
                onClick={() => void handleSend()}
                disabled={isLoading || !input.trim()}
                className={cls(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-neutral-700 border border-neutral-200 bg-neutral-50 hover:bg-neutral-100",
                  isLoading && "opacity-60"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Enviar
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="text-center text-[11px] text-neutral-400 mt-2">
            GLIA • BIONAI — Inteligência que entende você
          </div>
        </div>
      </footer>
    </div>
  );
}
