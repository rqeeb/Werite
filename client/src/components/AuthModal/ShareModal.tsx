import { X } from "lucide-react";
import "./modal.css";
import { useState } from "react";
import {api} from "../../lib/api";
import { toast } from "react-toastify";

type SignupModalProps = {
  onClose: () => void;
  isDark: boolean;
  documentId: string | undefined;
  switchTab: (tab: string) => void;
};

function ShareModal({
  onClose,
  isDark,
  documentId,
  switchTab,
}: SignupModalProps) {
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

  async function addMember() {
    if (!validateInputs()) {
      return;
    }
    if (documentId === undefined) {
      toast.error("No Document to share");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post(
        `/api/document/${documentId}/members`,
        {
          email,
          role,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("User added successful");
      // console.log(response);
    } catch (e) {
      console.log(e);
      toast.error("Error adding user");
      //todo: add u w sttus codes
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`modalBackdrop ${isClosing ? "isClosing" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`loginModal ${isDark ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="closeButton">
          <X />
        </button>

        <div className="ShareContent">
          <div className="shareMeta">
            {/* <p className="shareEyebrow">COLLABORATION</p> */}
            {/* <Share2 size={22} /> */}
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
            onClick={addMember}
          >
            {isLoading ? (
              <span className={`spinner ${isDark ? "dark" : "light"}`} />
            ) : (
              "Invite Collaborator"
            )}
          </button>

          <button
            className={`switchManageButton`}
            disabled={isLoading}
            onClick={() => switchTab("manage")}
          >
            Manage members
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
