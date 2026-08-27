import { Library, Plus, Search } from "lucide-react";
import "./Sidebar.css";
import { SidebarDocument } from "./SidebarDocument";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type User = {
  id: string;
  username: string;
  email: string;
};

type SidebarProps = {
  isSidebarOpen: boolean;
  user: User | null;
  openLogin: () => void;
  checkAuthLoading: boolean;
  isDark: boolean;
  createDocument: () => void;
  setTextAreaDefault: () => void;
  isOwner: boolean;
};

type DocumentItem = {
  id: string;
  title: string;
  updatedAt: string;
};

export function Sidebar({
  isSidebarOpen,
  user,
  openLogin,
  checkAuthLoading,
  isDark,
  createDocument,
  setTextAreaDefault,
  isOwner,
}: SidebarProps) {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [documentsLoading, setDocumentsLoading] = useState(true);

  const navigate = useNavigate();
  const { id: currentDocumentId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user) {
      setDocuments([]);
      return;
    }

    async function fetchDocuments() {
      try {
        setDocumentsLoading(true);

        const fetchedDocs = await axios.get(
          "http://localhost:2021/api/document",
          {
            withCredentials: true,
          },
        );

        setDocuments(fetchedDocs.data.documents ?? []);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching documents");
      } finally {
        setDocumentsLoading(false);
      }
    }

    fetchDocuments();
  }, [user, currentDocumentId]);

  const filteredDocuments = documents.filter((document) => {
    const documentTitle = document.title.trim() || "Untitled";

    return documentTitle
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
  });

  async function onDelete(id: string) {
    try {
      await axios.delete(`http://localhost:2021/api/document/${id}`, {
        withCredentials: true,
      });

      const nextDocument = documents.find((document) => document.id !== id);

      setDocuments((previousDocuments) =>
        previousDocuments.filter((document) => document.id !== id),
      );

      if (currentDocumentId === id) {
        if (nextDocument) {
          navigate(`/document/${nextDocument.id}`);
        } else {
          setTextAreaDefault();
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't delete document");
    }
  }

  return (
    <div className={`sidebarContainer ${isSidebarOpen ? "open" : ""}`}>
      {user ? (
        <div className={`innerSidebarContainer `}>
          <div className="sidebarHeader">
            <Library size={28} />
            <span>Werite</span>
          </div>

          <div className={`sidebarSearch ${isDark ? "light" : "dark"}`}>
            <Search size={17} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="newDocumentButton" onClick={createDocument}>
              <Plus size={20} />
            </button>
          </div>

          <div className="sidebarDocumentContainer">
            {documentsLoading ? (
              <p className="documentsMessage">Loading Documents....</p>
            ) : filteredDocuments.length === 0 ? (
              <p className="documentsMessage">
                {searchQuery ? "No matching documents" : "No documents yet..."}
              </p>
            ) : (
              filteredDocuments.map((document) => (
                <SidebarDocument
                  key={document.id}
                  title={document.title}
                  isActive={document.id === currentDocumentId}
                  onClick={() => navigate(`/document/${document.id}`)}
                  onDelete={() => onDelete(document.id)}
                  isOwner={isOwner}
                />
              ))
            )}
          </div>
        </div>
      ) : checkAuthLoading ? (
        <div className="sidebarSpinnerContainer">
          <span className={`sidebarSpinner ${isDark ? "light" : "dark"}`} />
        </div>
      ) : (
        <div className={`sidebarLoggedOut ${isDark ? "light" : "dark"}`}>
          <div className={`sidebarLoggedOutIcon ${isDark ? "light" : "dark"}`}>
            <Library size={26} />
          </div>

          <h3>Your docs live here</h3>

          <p>Log in to view, create, and manage your docs.</p>

          <button
            type="button"
            className={`sidebarLoginButton ${isDark ? "light" : "dark"}`}
            onClick={openLogin}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}
