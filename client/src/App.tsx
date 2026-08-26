import {useEffect, useState } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { TextArea } from "./components/TextArea";
import "./index.css";
import LoginModal from "./components/AuthModal/LoginModal";
import SignupModal from "./components/AuthModal/SignupModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareModal from "./components/AuthModal/ShareModal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";

export function App() {
  const { id: documentId } = useParams();
  const navigate = useNavigate();

  const [headingFontSize, setHeadingFontSize] = useState(40);
  const [paragraphFontSize, setParagraphFontSize] = useState(22);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  });
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [activeModal, setActiveModal] = useState<
    "login" | "signup" | "share" | null
  >(null);
  const [currentModal, setCurrentModal] = useState<
    "login" | "signup" | "share"
  >("signup");
  // const [documentId, setDocumentId] = useState<string | null>(id!);
  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checkAuthLoading, setCheckAuthLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<
    "saving" | "saved" | "couldnt save" | "saved locally" | "view only"
  >("saved");
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDark
      ? "rgb(0, 0, 0)"
      : "rgb(242, 239, 233)";

    document.body.style.color = isDark ? "white" : "black";
  }, [isDark]);

  useEffect(() => {
    if (user || checkAuthLoading) return;

    localStorage.setItem("guestHeading", heading);
    localStorage.setItem("guestParagraph", paragraph);
    setIsSaving("saved locally");
  }, [heading, paragraph, user, checkAuthLoading]);

  useEffect(() => {
    async function checkAuth() {
      try {
        // setCheckAuthLoading(true);
        const response = await axios.get("http://localhost:2021/auth/me", {
          withCredentials: true,
        });

        setUser(response.data.user);
        // console.log(response.data.user);
        setCurrentModal("share");
      } catch {
        setUser(null);
        setHeading(localStorage.getItem("guestHeading") ?? "");
        setParagraph(localStorage.getItem("guestParagraph") ?? "");

        // setCurrentModal("login");
      } finally {
        setCheckAuthLoading(false);
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    if (!documentId || !user || isDocumentLoading || !canEdit) {
      return;
    }

    // console.log("Checking");
    // console.log(documentId);
    // console.log(user)

    setIsSaving("saving");
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
        setIsSaving("saved");
      } catch (error) {
        setIsSaving("couldnt save");
        console.log(error);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [heading, paragraph, documentId, user, isDocumentLoading,canEdit]);

  useEffect(() => {
    // console.log("new load start")
    if (!documentId || !user) {
      return;
    }

    async function loadDocument() {
      try {
        setIsDocumentLoading(true);
        const response = await axios.get(
          `http://localhost:2021/api/document/${documentId}`,
          {
            withCredentials: true,
          },
        );

        setCanEdit(response.data.canEdit);
        // console.log(response.data.canEdit);
        setHeading(response.data.document.title);
        setParagraph(response.data.document.content);
      } catch (error) {
        console.log(error);
      } finally {
        setIsDocumentLoading(false);
      }
    }

    loadDocument();
  }, [documentId, user]);

  useEffect(() => {
    if (documentId || !user) {
      return;
    }

    async function createDocument() {
      try {
        const response = await axios.post(
          "http://localhost:2021/api/document",
          {
            title: heading,
            content: paragraph,
          },
          {
            withCredentials: true,
          },
        );

        navigate(`/document/${response.data.document.id}`, { replace: true });
        // setDocumentId(response.data.document.id);
        // console.log("created new document");
      } catch (error) {
        console.log(error);
      }
    }

    createDocument();
  }, [documentId, user]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    if (canEdit === false) {
      setIsSaving("view only");
    }
  }, [canEdit]);

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
    if (activeModal === currentModal) {
      setActiveModal(null);
    } else {
      setActiveModal(currentModal);
    }
  }

  function handleLogin(user: { id: string; username: string; email: string }) {
    setUser(user);
    setCurrentModal("share");
    setActiveModal("share");
  }

  function createDocument() {
    navigate(`/`);
    setHeading("");
    setParagraph("");
  }

  function setTextAreaDefault() {
    setHeading("");
    setParagraph("");
  }

  return (
    <div>
      <ToastContainer />

      <NavBar
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        currentFontSize={paragraphFontSize}
        toggleTheme={toggleTheme}
        exportMD={exportMD}
        openModal={openCurrentModal}
        openSidebar={() => {
          setIsSidebarOpen((prev) => !prev);
        }}
        isSaving={isSaving}
      />

      <div className="workspace">
        <div className={`editorArea ${isSidebarOpen ? "sidebarOpen" : ""}`}>
          <TextArea
            headingFontSize={headingFontSize}
            paragraphFontSize={paragraphFontSize}
            heading={heading}
            setHeading={setHeading}
            paragraph={paragraph}
            setParagraph={setParagraph}
            canEdit={canEdit}
          />
        </div>

        <Sidebar
          isSidebarOpen={isSidebarOpen}
          user={user}
          openLogin={() => switchTab("login")}
          checkAuthLoading={checkAuthLoading}
          isDark={isDark}
          createDocument={createDocument}
          setTextAreaDefault={setTextAreaDefault}
        />
      </div>

      {activeModal === "login" && (
        <LoginModal
          onClose={onClose}
          isDark={isDark}
          switchTab={switchTab}
          handleLogin={handleLogin}
        />
      )}

      {activeModal === "signup" && (
        <SignupModal onClose={onClose} isDark={isDark} switchTab={switchTab} />
      )}

      {activeModal === "share" && (
        <ShareModal isDark={isDark} onClose={onClose} documentId={documentId} />
      )}
    </div>
  );
}

export default App;
