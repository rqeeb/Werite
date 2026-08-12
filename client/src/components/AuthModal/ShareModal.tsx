type ShareModalProps = {
  onClose: () => void;
}


const ShareModal = ({onClose}:ShareModalProps) => {
  return (
    <div >
    
     <button onClick={onClose}>
      Close modal 
     </button>
     
    </div>
  )
}

export default ShareModal
