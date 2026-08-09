import { X } from "lucide-react";
import "./modal.css";

type LoginModalProps = {
  onClose: () => void;
  isDark: boolean;
};

function LoginModal({ onClose, isDark }: LoginModalProps) {
  return (
    <div className="modalBackdrop">
      <div
        className={`loginModal ${isDark ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="closeButton">
          <X />
        </button>

        <div className="loginContent">
          <h2>Please Login...</h2>
          <p>welcome back!</p>

          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
          </div>

          <button className="loginButton">Login</button>
        </div>

        <button>Login</button>
      </div>
    </div>
  );
}

export default LoginModal;
