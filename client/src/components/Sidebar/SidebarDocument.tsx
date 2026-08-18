type SidebarDocumentProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

export function SidebarDocument({
  title,
  isActive,
  onClick,
}: SidebarDocumentProps) {
  return (
    <button
      type="button"
      className={`sidebar-document ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {title.trim() || "Untitled"}
    </button>
  );
}