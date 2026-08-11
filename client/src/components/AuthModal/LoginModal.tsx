import { X } from "lucide-react";
import "./modal.css";
import { useState } from "react";

type LoginModalProps = {
  onClose: () => void;
  isDark: boolean;
  switchTab: (tab: string) => void;
};

function LoginModal({ onClose, isDark, switchTab }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginFunction() {
    
  }

  function changeToSignup() {
    switchTab("signup");
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
          <p>Go write peak!</p>

          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            className={`loginButton ${isDark ? "dark" : "light"}`}
            onClick={loginFunction}
          >
            Login
          </button>
        </div>

        <div style={{ color: "grey", marginTop: "4px" }}>
          Don't have an account?
          <span
            onClick={changeToSignup}
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
