import { HeadingTextArea } from "./HeadingTextArea";
import { ParagraphTextArea } from "./ParagraphTextArea";
import "./TextArea.css";

type ITextArea = {
  headingFontSize: number;
  paragraphFontSize: number;
};

export function TextArea({ headingFontSize, paragraphFontSize }: ITextArea) {
  return (
    <div id="TextAreaContainer">
      <HeadingTextArea headingFontSize={headingFontSize} />
      <ParagraphTextArea paragraphFontSize={paragraphFontSize} />
    </div>
  );
}
