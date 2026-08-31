import { Trash, Users } from "lucide-react";
import { useState } from "react";

type SidebarDocumentProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => Promise<void>;
  isOwner: boolean;
  isDark: boolean;
};

export function SidebarDocument({
  title,
  isActive,
  onClick,
  onDelete,
  isOwner,
  isDark,
}: SidebarDocumentProps) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleteLoading(true);

      const confirmed = window.confirm(
        "Delete this document permanently? This cannot be undone."
      )
      if(!confirmed) return;

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

      {isOwner && (
        <button
          type="button"
          className={`deleteDocumentButton ${isDeleteLoading ? "loading" : ""} user`}
          disabled={isDeleteLoading}
          aria-label="Manage users"
        >
          <Users size={15} />
        </button>
      )}

      {isOwner && (
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
      )}

      {/* {!isOwner && (
        <span className={`sharedLabel  ${isDark ? "light" : "dark"}`}>
          Shared
        </span>
      )} */}
    </div>
  );
}
