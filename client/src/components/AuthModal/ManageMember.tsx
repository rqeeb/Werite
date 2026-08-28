type ManageMemberProps = {
  username: string;
  email: string;
  role: "VIEWER" | "EDITOR";
};

function ManageMember({ username, email, role }: ManageMemberProps) {
  const initial = (username || email).trim().charAt(0).toUpperCase();

  return (
    <div className="memberRow">
      <div className="memberAvatar">{initial}</div>

      <div className="memberInfo">
        <p className="memberName">{username}</p>
        <p className="memberEmail">{email}</p>
      </div>

      <span className={`memberRole ${role.toLowerCase()}`}>
        {role === "EDITOR" ? "Can edit" : "View only"}
      </span>
    </div>
  );
}

export default ManageMember;
