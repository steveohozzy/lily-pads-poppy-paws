type Props = { text?: string; highlight?: string };

const defaultHighlights = [
  "Hemel Hempstead",
  "every dog.",
  "glow-up?",
  "family.",
  "Lovely results.",
  "dog grooming.",
  "lovely transformations.",
  "tails wagging!",
  "gallery.",
  "more paw-some moments.",
  "pamper",
  "full grooms."
];

export default function HighlightedText({ text = "", highlight }: Props) {
  const phrase = highlight || defaultHighlights.find((candidate) => text.toLowerCase().includes(candidate.toLowerCase()));
  if (!phrase) return <>{text}</>;

  const index = text.toLowerCase().indexOf(phrase.toLowerCase());
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span>{text.slice(index, index + phrase.length)}</span>
      {text.slice(index + phrase.length)}
    </>
  );
}
