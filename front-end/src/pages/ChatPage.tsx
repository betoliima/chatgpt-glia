import { useEffect, useMemo, useRef, useState } from 'react';
import TypingIndicator from '../components/ui/TypingIndicator';
import { useChat } from '../hooks/useChat';
import gliaLogo from '../assets/logo_glia-removebg-preview.png';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Usar o hook personalizado para gerenciar o chat
  const { messages, isLoading, sendMessage } = useChat();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages.length, isLoading]);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  const taglines = useMemo(
    () => [
      'Quebre o óbvio.',
      'Mude o jogo.',
      'Desafie o impossível.',
      'Crie o futuro.',
      'O limite é uma ilusão.',
      'Seja o ruído no silêncio.',
      'Revolucione o comum.',
      'Sonhe em código.',
      'Inove sem pedir permissão.',
      'Transforme caos em ideia.',
    ],
    []
  );

  const currentTagline = useMemo(() => {
    const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const index = taglines.length > 0 ? daysSinceEpoch % taglines.length : 0;
    return taglines[index] ?? '';
  }, [taglines]);

  async function handleSend() {
    if (!canSend) return;
    
    const messageText = input.trim();
    setInput('');
    await sendMessage(messageText);
  }

  const inputBox = (
    <div className="mx-auto max-w-3xl px-2 py-3 sm:px-0">
      <div className="rounded-2xl border border-neutral-200 p-2 shadow-sm">
        <div className="flex items-end gap-2">
          <div className="hidden" />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
            placeholder="Envie uma mensagem…"
            className="min-h-[44px] max-h-40 flex-1 resize-none rounded-xl px-3 py-2 outline-none placeholder:text-neutral-400"
          />
          <button
            disabled={!canSend}
            onClick={handleSend}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
        <div className="mt-1 flex items-center justify-end px-1 text-[11px] text-neutral-500">
          <div>Enter envia • Shift+Enter quebra linha</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-neutral-50 text-neutral-900">
      {/* Header fixo no topo */}
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-4xl items-center justify-center px-4 py-3">
          {/* Logo GLIA no header */}
          <div className="flex items-center gap-2">
            <img src={gliaLogo} alt="GLIA" className="h-8 w-8 object-contain" />
            <div className="text-sm font-medium text-neutral-900">GLIA Intelligence</div>
          </div>
        </div>
      </header>

      {/* Main alterna entre caixa centralizada (sem mensagens) e layout com rodapé (com mensagens) */}
      {messages.length === 0 ? (
        <main className="mx-auto flex h-[calc(100vh-56px)] max-w-4xl items-center justify-center px-2 sm:px-4">
          <div className="w-full">
            <div className="mx-auto max-w-3xl px-2 sm:px-0">
              <div className="mb-2 select-none text-center text-base font-semibold tracking-wide text-neutral-800 sm:text-lg">
                {currentTagline}
              </div>
            </div>
            {inputBox}
          </div>
        </main>
      ) : (
        <main className="mx-auto flex h-[calc(100vh-56px)] max-w-4xl flex-col px-2 sm:px-4">
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-1 sm:px-2">
            <div className="mx-auto max-w-3xl space-y-6 py-6">
              {messages.map((m) => (
                <div key={m.id} className={`flex w-full gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {/* Avatar GLIA */}
                  {m.role === 'assistant' && (
                    <div className="mt-1 inline-flex h-6 w-6 items-center justify-center overflow-hidden">
                      <img src={gliaLogo} alt="GLIA" className="h-6 w-6 object-contain" />
                    </div>
                  )}
                  
                  {/* Texto simples sem balão */}
                  <div className="max-w-[85%] text-[15px] leading-relaxed">
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                  
                  {/* Avatar do usuário */}
                  {m.role === 'user' && (
                    <div className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-neutral-700">
                      <span className="text-[10px] font-medium">Você</span>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex w-full items-start gap-3">
                  <div className="mt-1 inline-flex h-6 w-6 items-center justify-center overflow-hidden">
                    <img src={gliaLogo} alt="GLIA" className="h-6 w-6 object-contain" />
                  </div>
                  <div className="text-[15px]">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-neutral-200">
            {inputBox}
          </div>
        </main>
      )}
    </div>
  );
}


