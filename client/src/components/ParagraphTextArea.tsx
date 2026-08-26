import { useEffect, useState } from "react";

type IParagraphTextArea = {
  paragraphFontSize: number;
  paragraph: string;
  setParagraph: React.Dispatch<React.SetStateAction<string>>;
  canEdit: boolean;
};

export function ParagraphTextArea({
  paragraphFontSize,
  paragraph,
  setParagraph,
  canEdit,
}: IParagraphTextArea) {
  const [placeholder, setPlaceholder] = useState("Type it out loud..");

  const placeholderLines = [
    "write peak, Shakespeare.",
    "make words hit.",
    "make Shakespeare nervous.",
    "Shakespeare is typing...",
    "write. cook. repeat.",
    "write your magnum opus",
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * placeholderLines.length);

    setPlaceholder(placeholderLines[randomIndex]!);
  }, []);

  // console.log(canEdit);
  return (
    <>
      <textarea
        readOnly={!canEdit}
        autoComplete="off"
        autoCorrect="off"
        value={paragraph}
        onChange={(e) => {
          setParagraph(e.target.value);
        }}
        style={{ fontSize: `${paragraphFontSize}px` }}
        spellCheck={false}
        name="ParagraphTextArea"
        id="ParagraphTextArea"
        placeholder={placeholder}
      ></textarea>
    </>
  );
}
