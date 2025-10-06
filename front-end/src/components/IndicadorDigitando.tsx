export default function IndicadorDigitando() {
  return (
    <div className="flex items-center gap-1">
      <span className="inline-flex h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.2s]"></span>
      <span className="inline-flex h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400"></span>
      <span className="inline-flex h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:0.2s]"></span>
    </div>
  );
}


