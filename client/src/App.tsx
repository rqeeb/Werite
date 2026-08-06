import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { TextArea } from "./components/TextArea";
import "./index.css";

export function App() {
  const [headingFontSize, setHeadingFontSize] = useState(40);
  const [paragraphFontSize, setParagraphFontSize] = useState(30);
  const [isDark, setIsDark] = useState(true);
  const [heading,setHeading] = useState("");
  const [paragraph,setParagraph] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = isDark
      ? "rgb(10, 10, 10)"
      : "rgb(242, 239, 233)";

    document.body.style.color = isDark ? "white" : "black";
  }, [isDark]);

  function zoomIn() {
    setHeadingFontSize((prev) => Math.min(60, prev + 2));
    setParagraphFontSize((prev) => Math.min(50, prev + 2));
  }

  function zoomOut() {
    setHeadingFontSize((prev) => Math.max(24, prev - 2));
    setParagraphFontSize((prev) => Math.max(14, prev - 2));
  }

  function toggleTheme() {
    setIsDark((prev: boolean) => !prev);
  }

  return (
    <div>
      <TextArea
        headingFontSize={headingFontSize}
        paragraphFontSize={paragraphFontSize}
      />
      <NavBar
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        currentFontSize={paragraphFontSize}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App;
