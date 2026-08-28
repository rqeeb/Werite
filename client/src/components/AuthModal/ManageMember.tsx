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

      <span className={`memberRole viewer`}>
        {role === "EDITOR" ? "Editor" : "Viewer"}
      </span>

      <button
        type="button"
        // className={`deleteDocumentButton user`}
        // disabled={isDeleteLoading}
        aria-label="Remove User"
      >
        <Trash size={15} />
      </button>
    </div>
  );
}

export default ManageMember;
