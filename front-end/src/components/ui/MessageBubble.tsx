import TextoRico from './TextoRico';
import CopyButton from './CopyButton';
import gliaLogo from '../../assets/logo_glia-removebg-preview.png';

type Props = {
  role: 'user' | 'assistant';
  content: string;
};

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white ring-1 ring-neutral-200 overflow-hidden">
          <img src={gliaLogo} alt="GLIA" className="h-7 w-7 object-contain" />
        </div>
      )}
      <div className={`max-w-[85%] text-[15px] leading-relaxed`}>
        <TextoRico content={content} />
        <div className={`mt-2 flex items-center gap-2 text-[11px] ${isUser ? 'justify-end text-neutral-400' : 'text-neutral-400'}`}>
          <CopyButton text={content} />
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


