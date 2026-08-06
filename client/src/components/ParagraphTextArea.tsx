type IParagraphTextArea = {
  paragraphFontSize: number;
  paragraph: string;
  setParagraph: React.Dispatch<React.SetStateAction<string>>;
};

export function ParagraphTextArea({
  paragraphFontSize,
  paragraph,
  setParagraph,
}: IParagraphTextArea) {
  return (
    <>
      <textarea
        value={paragraph}
        onChange={(e) => {
          setParagraph(e.target.value);
        }}
        style={{ fontSize: `${paragraphFontSize}px` }}
        spellCheck={false}
        name="ParagraphTextArea"
        id="ParagraphTextArea"
        placeholder="Type it out loud.."
      ></textarea>
    </>
  );
}
