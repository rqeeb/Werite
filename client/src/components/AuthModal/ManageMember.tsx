import { Trash } from "lucide-react";

type ManageMemberProps = {
  username: string;
  email: string;
  role: "VIEWER" | "EDITOR";
};

function ManageMember({ username, email, role }: ManageMemberProps) {
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
          defaultValue={role}
          aria-label={`Change ${username}'s permission`}
        >
          <option value="EDITOR">Editor</option>
          <option value="VIEWER">Viewer</option>
        </select>

        <button
          type="button"
          className="memberRemoveButton"
          aria-label={`Remove ${username}`}
          title="Remove access"
        >
          <Trash size={15} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

export default ManageMember;
