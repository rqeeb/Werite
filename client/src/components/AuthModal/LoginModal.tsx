import "./modal.css"

type LoginModalProps = {
  onClose: () => void;
};

function LoginModal({ onClose }: LoginModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
     
    </div>
  );
}

export default LoginModal;
