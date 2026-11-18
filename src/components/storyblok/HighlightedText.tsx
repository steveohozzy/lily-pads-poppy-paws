type Props = { text?: string; highlight?: string };

export default function HighlightedText({ text = "", highlight }: Props) {
  if (!highlight) return <>{text}</>;
  const index = text.indexOf(highlight);
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span>{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}
