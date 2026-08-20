type ShareModalProps = {
  onClose: () => void;
};

const ShareModal = ({ onClose }: ShareModalProps) => {
  return (
    <div
      style={{
        position: "relative",
        zIndex: "999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{ zIndex: "999", justifyContent: "center" }}
        onClick={onClose}
      >
        Close modal
      </button>
    </div>
  );
};

export default ShareModal;
