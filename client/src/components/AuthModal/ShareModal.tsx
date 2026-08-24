import { Share2, X } from "lucide-react";
import "./modal.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type SignupModalProps = {
  onClose: () => void;
  isDark: boolean;
};

function ShareModal({ onClose, isDark }: SignupModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [role, setRole] = useState<"VIEWER" | "EDITOR">("VIEWER");
  const [isClosing, setIsClosing] = useState(false);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateInputs() {
    let isValid = true;

    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email");
      isValid = false;
    }

    return isValid;
  }

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
          <h2>Add a member</h2>
          <p className="shareSubtitle">Give someone access to this document.</p>

          <div className="inputGroup">
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
          </div>

          <div className="inputGroup">
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
          </div>

          <button
            className={`loginButton ${isDark ? "dark" : "light"}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={`spinner ${isDark ? "dark" : "light"}`} />
            ) : (
              "Invite Collaborator"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
