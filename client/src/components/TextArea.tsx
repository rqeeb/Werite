import { HeadingTextArea } from "./HeadingTextArea";
import { ParagraphTextArea } from "./ParagraphTextArea";

export function TextArea() {
  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "80px auto",
        padding: "0 24px",
      }}
    >
      <HeadingTextArea />
      <ParagraphTextArea />
    </div>
  );
}
