import { Share2, X } from "lucide-react";
import "./modal.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type ManageUsersModalProps = {
  onClose: () => void;
  isDark: boolean;
  documentId: string | undefined;
};

function ManageUsersModal({
  onClose,
  isDark,
  documentId,
}: ManageUsersModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  function handleClose() {
    setIsClosing(true);
    setTimeout(onClose, 180);
  }

  return (
    <div className={`modalBackdrop ${isClosing ? "isClosing" : ""}`}>
      <div
        className={`loginModal ${isDark ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="closeButton">
          <X />
        </button>

        <div className="ShareContent">
          <div className="shareMeta">
            <Share2 size={22} />
            <p className="shareEyebrow">COLLABORATION</p>
          </div>
          <h2>Manage Members</h2>
          <p className="shareSubtitle">Edit members and their permission.</p>

          {/* <div className="inputGroup">
            <label className={emailError ? "ErrorState" : ""} htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="they@example.com"
              value={email}
              className={emailError ? "inputError" : ""}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />

            {emailError && <span className="errorMessage">{emailError}</span>}
          </div> */}

          {/* <div className="inputGroup">
            <label>Permission</label>

            <div className="shareRolePicker">
              <button
                type="button"
                className={`shareRoleOption ${role === "VIEWER" ? "selected" : ""}`}
                onClick={() => setRole("VIEWER")}
              >
                <span>View only</span>
                <small>Can read</small>
              </button>

              <button
                type="button"
                className={`shareRoleOption ${role === "EDITOR" ? "selected" : ""}`}
                onClick={() => setRole("EDITOR")}
              >
                <span>Can edit</span>
                <small>Can read and write</small>
              </button>
            </div>
          </div> */}

          {/* <button
            className={`loginButton ${isDark ? "dark" : "light"}`}
            disabled={isLoading}
            onClick={addMember}
          >
            {isLoading ? (
              <span className={`spinner ${isDark ? "dark" : "light"}`} />
            ) : (
              "Invite Collaborator"
            )}
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ManageUsersModal;
