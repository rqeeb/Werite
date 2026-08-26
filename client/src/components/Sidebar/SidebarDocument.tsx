import { Trash, Users } from "lucide-react";
import { useState } from "react";

type SidebarDocumentProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => Promise<void>;
};

export function SidebarDocument({
  title,
  isActive,
  onClick,
  onDelete,
}: SidebarDocumentProps) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleteLoading(true);

      await onDelete();
    } catch (e) {
      console.log(e);
    } finally {
      setIsDeleteLoading(false);
    }
  }

  return (
    <div className={`SidebarDocumentRow ${isActive ? "active" : ""}`}>
      <button
        type="button"
        className={`sidebar-document`}
        onClick={onClick}
        disabled={isDeleteLoading}
      >
        {title.trim() || "Untitled"}
      </button>

      <button
        type="button"
        className={`deleteDocumentButton ${isDeleteLoading ? "loading" : ""} user`}
        disabled={isDeleteLoading}
        aria-label="Delete document"
      >
        <Users size={15} />
      </button>

      <button
        type="button"
        className={`deleteDocumentButton ${isDeleteLoading ? "loading" : ""}`}
        disabled={isDeleteLoading}
        aria-label="Delete document"
        onClick={handleDelete}
      >
        {isDeleteLoading ? (
          <span className="deleteSpinner" />
        ) : (
          <Trash size={15} strokeWidth={1.8} />
        )}
      </button>
    </div>
  );
}
