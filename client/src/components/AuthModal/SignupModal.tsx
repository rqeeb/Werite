import { X } from "lucide-react";
import "./modal.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type SignupModalProps = {
  onClose: () => void;
  isDark: boolean;
  switchTab: (tab: string) => void;
};

function SignupModal({ onClose, isDark, switchTab }: SignupModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
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
        password,
      });

      toast.success("Sign up successful, please login");
      switchTab("login");
    } catch (error) {
      toast.error(`An error occured {error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div
        className={`loginModal ${isDark ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="closeButton">
          <X />
        </button>

        <div className="loginContent">
          <h2>Sign up</h2>
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
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              className={passwordError ? "inputError" : ""}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />

            {passwordError && (
              <span className="errorMessage">{passwordError}</span>
            )}
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
            onClick={() => switchTab("login")}
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

export default SignupModal;
