import { useEffect, useRef, useState, KeyboardEvent } from "react";
import {
  Menu,
  Bot,
  User,
  Send,
  Trash2,
  Copy,
  Check,
  Loader2,
} from "lucide-react";

/**
 * ChatLayoutLikeGPT
 * - Layout inspirado no ChatGPT (header fixo, sidebar, área central com mensagens, textarea fixa)
 * - Enter = enviar | Shift+Enter = quebra linha
 * - Auto-scroll ao receber/enviar
 * - "Digitando…" com três bolinhas
 * - Botões: Enviar, Limpar
 * - Copiar conteúdo da mensagem
 *
 * IMPORTANTE:
 * - Substitua o BLOCO "MOCK (resposta de exemplo)" dentro do handleSend()
 *   pela sua chamada real ao backend (fetch("/api/chat", ...)).
 */

type Role = "user" | "assistant";
type Msg = { id: string; role: Role; content: string };

function cls(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function ChatLayoutLikeGPT() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

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
    if (!text || loading) return;

    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Chamada real ao backend
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const assistantText = data.reply ?? "Sem resposta.";

      const assistantMsg: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: assistantText,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Erro ao obter resposta. Tente novamente.",
      };
      setMessages((prev) => [...prev, errorMsg]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setMessages([]);
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
    <div className="h-dvh w-full bg-neutral-50 text-neutral-900 flex">
      {/* SIDEBAR (desktop) */}
      <aside
        className={cls(
          "hidden md:flex md:flex-col shrink-0 border-r border-neutral-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60",
          sidebarOpen ? "w-64" : "w-14"
        )}
      >
        <div className="h-14 px-3 flex items-center gap-2 border-b border-neutral-200">
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="p-2 rounded hover:bg-neutral-100"
            aria-label="Toggle sidebar"
            title="Alternar sidebar"
          >
            <Menu className="size-5" />
          </button>
          {sidebarOpen && <div className="font-medium">Conversas</div>}
        </div>
        {sidebarOpen && (
          <div className="p-3 space-y-2 overflow-auto">
            {/* Itens estáticos (exemplo) */}
            <button className="w-full text-left px-3 py-2 rounded hover:bg-neutral-100">
              Sessão atual
            </button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-neutral-100">
              Exemplo anterior
            </button>
          </div>
        )}
      </aside>

      {/* COLUNA CENTRAL */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER FIXO */}
        <header className="sticky top-0 z-10 h-14 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 border-b border-neutral-200">
          <div className="h-full mx-auto max-w-5xl px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="size-5" />
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

        {/* LISTA DE MENSAGENS */}
        <main
          ref={listRef}
          className="flex-1 overflow-auto mx-auto max-w-4xl w-full px-4 py-4"
        >
          <div className="space-y-3">
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
                  {/* Avatar */}
                  {!isUser && (
                    <div className="shrink-0 mt-0.5">
                      <div className="size-8 rounded-full bg-neutral-200 flex items-center justify-center">
                        <Bot className="size-4 text-neutral-700" />
                      </div>
                    </div>
                  )}

                  {/* Bolha */}
                  <div
                    className={cls(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-[15px] leading-relaxed shadow-sm border",
                      isUser
                        ? "bg-white border-neutral-200"
                        : "bg-neutral-100 border-neutral-200"
                    )}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
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

                  {/* Avatar do usuário à direita */}
                  {isUser && (
                    <div className="shrink-0 mt-0.5">
                      <div className="size-8 rounded-full bg-neutral-200 flex items-center justify-center">
                        <User className="size-4 text-neutral-700" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Indicador de digitando… */}
            {loading && (
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-neutral-200 flex items-center justify-center">
                  <Bot className="size-4 text-neutral-700" />
                </div>
                <div className="rounded-2xl px-4 py-2 bg-neutral-100 border border-neutral-200 text-[15px] shadow-sm">
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

        {/* FOOTER / TEXTAREA */}
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
                  disabled={loading || !input.trim()}
                  className={cls(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-neutral-700 border border-neutral-200 bg-neutral-50 hover:bg-neutral-100",
                    loading && "opacity-60"
                  )}
                >
                  {loading ? (
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
              GLIA • BIONAI — layout semelhante ao ChatGPT (UI apenas)
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
