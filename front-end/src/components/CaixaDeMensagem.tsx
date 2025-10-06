import Logo from './Logo';
import TextoRico from './TextoRico';
import BotaoCopiar from './BotaoCopiar';

type Props = {
  role: 'user' | 'assistant';
  content: string;
};

export default function CaixaDeMensagem({ role, content }: Props) {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="mt-1 inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-neutral-200">
          <div className="flex h-full w-full items-center justify-center p-1"><Logo /></div>
        </div>
      )}
      <div className={`max-w-[85%] rounded-2xl border px-4 py-3 text-[15px] leading-relaxed shadow-sm ${isUser ? 'rounded-br-md border-neutral-200 bg-white' : 'rounded-bl-md border-neutral-200 bg-neutral-50'}`}>
        <TextoRico content={content} />
        <div className={`mt-2 flex items-center gap-2 text-[11px] ${isUser ? 'justify-end text-neutral-400' : 'text-neutral-400'}`}>
          <BotaoCopiar text={content} />
          <span>agora mesmo</span>
        </div>
      </div>
      {isUser && (
        <div className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-neutral-700">
          <span className="text-[11px] font-medium">Você</span>
        </div>
      )}
    </div>
  );
}


