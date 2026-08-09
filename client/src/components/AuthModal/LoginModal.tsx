import "./modal.css";

type LoginModalProps = {
  onClose: () => void;
};

function LoginModal({ onClose }: LoginModalProps) {
  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div className="loginModal" onClick={(e) => e.stopPropagation}>
        <button onClick={onClose}></button>

        <h2>Please Login...</h2>

        <input type="email" name="email" id="" />
        <input type="password" name="password" id="" />

        <button>Login</button>
      </div>
    </div>
  );
}

export default LoginModal;
