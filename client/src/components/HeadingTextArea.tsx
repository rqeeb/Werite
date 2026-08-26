type IHeadingTextArea = {
  headingFontSize: number;
  heading: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
  canEdit: boolean;
};

export function HeadingTextArea({
  headingFontSize,
  heading,
  setHeading,
  canEdit,
}: IHeadingTextArea) {
  return (
    <div className="HeadingTextAreaContainer">
      <input
        readOnly={!canEdit}
        autoComplete="off"
        autoCorrect="off"
        value={heading}
        onChange={(e) => {
          setHeading(e.target.value);
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
