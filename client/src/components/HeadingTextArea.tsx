type IHeadingTextArea = {
  headingFontSize: number;
  heading: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
};

export function HeadingTextArea({
  headingFontSize,
  heading,
  setHeading,
}: IHeadingTextArea) {
  return (
    <div className="HeadingTextAreaContainer">
      <input
        value={heading}
        onChange={(z) => {
          setHeading(z.target.value);
          console.log(z.target.value);
        }}
        spellCheck={false}
        name="HeadingTextArea"
        id="HeadingTextArea"
        placeholder="Untitled"
        style={{ fontSize: `${headingFontSize}px` }}
      ></input>
    </div>
  );
}
