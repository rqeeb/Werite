import { Trash } from "lucide-react";

type SidebarDocumentProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
};

export function SidebarDocument({
  title,
  isActive,
  onClick,
  onDelete,
}: SidebarDocumentProps) {

  


  return (
    <div className={`SidebarDocumentRow ${isActive ? "active" : ""}`}>
      <button
        type="button"
        className={`sidebar-document`}
        onClick={onClick}
      >
        {title.trim() || "Untitled"}
      </button>
      <button className="deleteDocumentButton" onClick={onDelete,()=>{}} >
        <Trash size={15} strokeWidth={1.8} />
      </button>
    </div>
  );
}
