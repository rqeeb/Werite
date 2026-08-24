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

  return (
    <div className="modalBackdrop">
      <div
        className={`loginModal ${isDark ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="closeButton">
          <X />
        </button>

        <div className="ShareContent">
          <div className="shareIcon">
            <Share2 size={20} />
          </div>
          <p className="shareEyebrow">COLLABORATION</p>
          <h2>Invite a writer</h2>
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
                onClick={() => setRole("EDITOR")}
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
                <small>Ca</small>
              </button>
            </div>
          </div>

          <button
            className={`loginButton ${isDark ? "dark" : "light"}`}
            disabled={isLoading}
            style={{ backgroundColor: "#AE37FF" }}
          >
            {isLoading ? (
              <span className={`spinner ${isDark ? "dark" : "light"}`} />
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
