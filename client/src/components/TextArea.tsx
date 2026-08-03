import { HeadingTextArea } from "./HeadingTextArea";
import { ParagraphTextArea } from "./ParagraphTextArea";
import "./TextArea.css"

export function TextArea() {
  return (
    <div id="TextAreaContainer" >
      <HeadingTextArea />
      <ParagraphTextArea />
    </div>
  );
}
