import { ArrowLeft, Share2, X } from "lucide-react";
import "./modal.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type ManageUsersModalProps = {
  onClose: () => void;
  isDark: boolean;
  documentId: string | undefined;
  switchTab: (tab: string) => void;
};

function ManageUsersModal({
  onClose,
  isDark,
  documentId,
  switchTab,
}: ManageUsersModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  function handleClose() {
    setIsClosing(true);
    setTimeout(onClose, 180);
  }

  return (
    <div className={`modalBackdrop ${isClosing ? "isClosing" : ""}`} onClick={handleClose}>
      <div
        className={`loginModal ${isDark ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="closeButton">
          <X />
        </button>

        <div className="ShareContent">
          <div
            className="shareMeta"
            style={{ color: "gray", cursor: "pointer" }}
            onClick={() => {
              switchTab("share");
            }}
          >
            <ArrowLeft size={22} />
            <span>Back</span>
          </div>
          <h2>Manage Members</h2>
          <p className="shareSubtitle">Edit members and their permission.</p>
        </div>
      </div>
    </div>
  );
}

export default ManageUsersModal;
