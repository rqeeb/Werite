import { HeadingTextArea } from "./HeadingTextArea";
import { ParagraphTextArea } from "./ParagraphTextArea";
import "./TextArea.css";

type ITextArea = {
  headingFontSize: number;
  paragraphFontSize: number;
  heading: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
  paragraph: string;
  setParagraph: React.Dispatch<React.SetStateAction<string>>;
  canEdit: boolean;
};

export function TextArea({
  headingFontSize,
  paragraphFontSize,
  heading,
  setHeading,
  paragraph,
  setParagraph,
  canEdit,
}: ITextArea) {
  return (
    <div id="TextAreaContainer">
      <HeadingTextArea
        headingFontSize={headingFontSize}
        heading={heading}
        setHeading={setHeading}
      />
      <ParagraphTextArea
        paragraphFontSize={paragraphFontSize}
        paragraph={paragraph}
        setParagraph={setParagraph}
        canEdit={canEdit}
      />
    </div>
  );
}
