import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { TextArea } from "./components/TextArea";
import "./index.css";
import LoginModal from "./components/AuthModal/LoginModal";
import SignupModal from "./components/AuthModal/SignupModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareModal from "./components/AuthModal/ShareModal";
import axios from "axios";

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
  const [activeModal, setActiveModal] = useState<
    "login" | "signup" | "share" | null
  >(null);
  const [currentModal, setCurrentModal] = useState<
    "login" | "signup" | "share"
  >("signup");
  const [documentId, setDocumentId] = useState<string | null>(
    "cmspxqtnh0004s4hmmi4ilbpz",
  );
  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);

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

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get("http://localhost:2021/auth/me", {
          withCredentials: true,
        });

        setUser(response.data.user);
        setCurrentModal("share");
      } catch {
        setUser(null);
        setCurrentModal("login");
      }
    }

    checkAuth();
  }, []);

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

  function onClose() {
    setActiveModal(null);
  }

  function switchTab(tab: string) {
    if (tab == "login") {
      setActiveModal("login");
      setCurrentModal("login");
    } else if (tab == "signup") {
      setActiveModal("signup");
      setCurrentModal("signup");
    } else if (tab == "share") {
      setActiveModal("share");
      setCurrentModal("share");
    } else {
      setActiveModal(null);
    }
  }

  function openCurrentModal() {
    setActiveModal(currentModal);
  }

  useEffect(() => {
    if (!documentId) {
      return;
    }
    if(!user){
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        await axios.patch(
          `http://localhost:2021/api/document/${documentId}`,
          {
            title: heading,
            content: paragraph,
          },
          {
            withCredentials: true,
          },
        );
        console.log("Saved");
      } catch (error) {
        console.log(error);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [heading, paragraph, documentId]);

  return (
    <div>
      <ToastContainer />
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
        openModal={openCurrentModal}
      />

      {activeModal === "login" && (
        <LoginModal onClose={onClose} isDark={isDark} switchTab={switchTab} />
      )}

      {activeModal === "signup" && (
        <SignupModal onClose={onClose} isDark={isDark} switchTab={switchTab} />
      )}

      {activeModal === "share" && <ShareModal onClose={onClose} />}
    </div>
  );
}

export default App;
