type ShareModalProps = {
  createDocument:()=>void
  onClose: () => void;
}


const ShareModal = ({createDocument,onClose}:ShareModalProps) => {
  return (
    <div >
     <button onClick={createDocument}>
      Create Document
     </button>
     <button onClick={onClose}>
      Close modal 
     </button>
     
    </div>
  )
}

export default ShareModal
