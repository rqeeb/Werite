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
  onDelete
}: SidebarDocumentProps) {
  return (
    <div className="SidebarDocumentRow">
      <button
        type="button"
        className={`sidebar-document ${isActive ? "active" : ""}`}
        onClick={onClick}
      >
        {title.trim() || "Untitled"}
      </button>

      <button className="deleteDocumentButton" >
        <Trash />
      </button>
    </div>
  );
}
