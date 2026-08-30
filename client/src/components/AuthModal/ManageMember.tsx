import { Trash } from "lucide-react";
import { useState } from "react";

type ManageMemberProps = {
  username: string;
  email: string;
  role: "VIEWER" | "EDITOR";
  onUpdate: (newRole: "VIEWER" | "EDITOR") => Promise<void>;
  onRemove: () => Promise<void>;
};

function ManageMember({
  username,
  email,
  role,
  onUpdate,
  onRemove,
}: ManageMemberProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = e.target.value as "VIEWER" | "EDITOR";

    if (newRole === role) return;

    try {
      setIsUpdating(true);
      await onUpdate(newRole);
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleRemove() {
    setIsDeleting(true);
    const confirmed = window.confirm(
      `Remove ${username}'s access to this document?`,
    );

    if (!confirmed) {
      setIsDeleting(false);
      return;
    }

    await onRemove();
    setIsDeleting(false);
  }

  return (
    <div className="memberRow">
      <div className="memberInfo">
        <p className="memberName">{username}</p>
        <p className="memberEmail">{email}</p>
      </div>

      <div className="memberActions">
        <select
          className="memberRoleSelect"
          name="role"
          value={role}
          aria-label={`Change ${username}'s permission`}
          disabled={isUpdating}
          onChange={handleRoleChange}
        >
          <option value="EDITOR">Editor</option>
          <option value="VIEWER">Viewer</option>
        </select>

        <button
          type="button"
          className="memberRemoveButton"
          aria-label={`Remove ${username}`}
          title="Remove access"
          disabled={isUpdating || isDeleting}
          onClick={handleRemove}
        >
          {isDeleting ? (
            <span className="deleteSpinner" />
          ) : (
            <Trash size={15} strokeWidth={1.8} />
          )}
        </button>
      </div>
    </div>
  );
}

export default ManageMember;
