import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { TextArea } from "./components/TextArea";
import "./index.css";
import LoginModal from "./components/AuthModal/LoginModal";

export function App() {
  const [headingFontSize, setHeadingFontSize] = useState(40);
  const [paragraphFontSize, setParagraphFontSize] = useState(22);
  const [isDark, setIsDark] = useState(true);
  const [heading, setHeading] = useState(() => {
    return localStorage.getItem("heading") || "";
  });
  const [paragraph, setParagraph] = useState(() => {
    return localStorage.getItem("paragraph") || "";
  });
  const [isLoginModalOpen, setisLoginModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDark
      ? "rgb(0, 0, 0)"
      : "rgb(242, 239, 233)";

    document.body.style.color = isDark ? "white" : "black";
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("heading", heading);
    localStorage.setItem("paragraph", paragraph);
  }, [heading, paragraph]);

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

  function exportMD() {
    const markDown = `# ${heading}\n${paragraph}`;

    const blob = new Blob([markDown], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const fileName = heading.trim().replace(/[<>:"/\\|?*]/g, "") || "Untitled";

    link.href = url;
    link.download = `${fileName}.md`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  }

  function openModal() {
    setisLoginModalOpen(!isLoginModalOpen);

  }

  return (
    <div>
      <TextArea
        headingFontSize={headingFontSize}
        paragraphFontSize={paragraphFontSize}
        heading={heading}
        setHeading={setHeading}
        paragraph={paragraph}
        setParagraph={setParagraph}
      />
      <NavBar
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        currentFontSize={paragraphFontSize}
        toggleTheme={toggleTheme}
        exportMD={exportMD}
        openModal={openModal}
      />
      {isLoginModalOpen && <LoginModal onClose={openModal} />}
    </div>
  );
}

export default App;
