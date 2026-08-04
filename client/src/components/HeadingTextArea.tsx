type IHeadingTextArea = {
  headingFontSize: number;
};

export function HeadingTextArea({ headingFontSize }: IHeadingTextArea) {
  return (
    <div className="HeadingTextAreaContainer">
      <input
        spellCheck={false}
        name="HeadingTextArea"
        id="HeadingTextArea"
        placeholder="Untitled"
        style={{fontSize:`${headingFontSize}px`}}
      ></input>
    </div>
  );
}
