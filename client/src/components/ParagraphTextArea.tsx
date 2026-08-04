
type IParagraphTextArea = {
  paragraphFontSize:number
}


export function ParagraphTextArea({paragraphFontSize}:IParagraphTextArea) {
  return (
    <>
      <textarea
        style={{fontSize:`${paragraphFontSize}px`}}
        spellCheck={false}
        name="ParagraphTextArea"
        id="ParagraphTextArea"
        placeholder="Type it out loud.."
      ></textarea>
    </>
  );
}
