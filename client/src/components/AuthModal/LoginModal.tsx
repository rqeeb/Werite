import { X } from "lucide-react";
import "./modal.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type User = {
  id: string;
  username: string;
  email: string;
};

type LoginModalProps = {
  onClose: () => void;
  isDark: boolean;
  switchTab: (tab: string) => void;
  handleLogin: (user: User) => void;
};

function LoginModal({
  onClose,
  isDark,
  switchTab,
  handleLogin,
}: LoginModalProps) {
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

  async function loginFunction() {
    if (!validateInputs()) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:2021/auth/login",
        {
          email: email.trim(),
          password,
        },
        {
          withCredentials: true,
        },
      );
      toast.success("Log in successful");
      handleLogin(response.data.user);
    } catch (error) {
      toast.error("Invalid credentials or user doesn't exists");
      console.log(error);
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
          <h2>Log in</h2>
          <p>Go write peak</p>

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
            onClick={loginFunction}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={`spinner ${isDark ? "dark" : "light"}`} />
            ) : (
              "Login"
            )}
          </button>
        </div>

        <div style={{ color: "grey", marginTop: "4px" }}>
          Don't have an account?
          <span
            onClick={() => switchTab("signup")}
            style={{
              cursor: "pointer",
              color: "inherit",
              textDecoration: "underline",
              marginLeft: "0.25rem",
            }}
          >
            Create one
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
