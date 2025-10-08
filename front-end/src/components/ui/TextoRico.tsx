type Props = { content: string };

export default function TextoRico({ content }: Props) {
  const trimmed = content.trim();
  const isCodeBlock = trimmed.startsWith("```") && trimmed.endsWith("```");
  if (isCodeBlock) {
    const code = trimmed.slice(3, -3).replace(/^\w*\n?/, "");
    return (
      <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-900 p-3 text-sm text-neutral-50">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div className="prose prose-neutral max-w-none text-[15px] prose-p:my-2 prose-pre:my-0">
      {content.split("\n").map((line, idx) => (
        <p key={idx} className="whitespace-pre-wrap">{line}</p>
      ))}
    </div>
  );
}


