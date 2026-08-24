import { X } from "lucide-react";
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
  const [passwordError, setPasswordError] = useState("");

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateInputs() {
    let isValid = true;

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email");
      isValid = false;
    }

    return isValid;
  }

  async function signupFunction() {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:2021/auth/signup", {
        email: email.trim(),
      });

      toast.success("Sign up successful, please login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 409) {
          setEmailError("An account with this email already exists");
          toast.error("Email already registered");
        } else if (status === 400) {
          toast.error(
            error.response?.data?.error || "Invalid email or password",
          );
        } else if (status === 500) {
          toast.error("Server error. Please try again.");
        } else if (!error.response) {
          toast.error("Cannot connect to the server");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
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
          <h2>Share this Document</h2>
          <p>Shakespeare would be jealous</p>

          <div className="inputGroup">
            <label className={emailError ? "ErrorState" : ""} htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
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
            <label
              className={passwordError ? "ErrorState" : ""}
              htmlFor="password"
            >
              Role
            </label>

            <select  name="role-dropdown" id="role-dropdown">
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          <button
            className={`loginButton ${isDark ? "dark" : "light"}`}
            onClick={signupFunction}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={`spinner ${isDark ? "dark" : "light"}`} />
            ) : (
              "Sign up"
            )}
          </button>
        </div>

        <div style={{ color: "grey", marginTop: "4px" }}>
          Already have an account?
          <span
            style={{
              cursor: "pointer",
              color: "inherit",
              textDecoration: "underline",
              marginLeft: "0.25rem",
            }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
