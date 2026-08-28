import { ArrowLeft, Share2, User, X } from "lucide-react";
import "./modal.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ManageUser from "./ManageMember";

type User = {
  id: string;
  username: string;
  email: string;
};

type Member = {
  id: string;
  role: "VIEWER" | "EDITOR";
  user: {
    id: string;
    username: string;
    email: string;
  };
};

type ManageMembersModalProps = {
  onClose: () => void;
  isDark: boolean;
  documentId: string | undefined;
  switchTab: (tab: string) => void;
  user: User | null;
};

function ManageMembersModal({
  onClose,
  isDark,
  documentId,
  switchTab,
  user,
}: ManageMembersModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  function handleClose() {
    setIsClosing(true);
    setTimeout(onClose, 180);
  }

  useEffect(() => {
    console.log("Effect");
    if (!user || !documentId) {
      setMembers([]);
      return;
    }

    async function fetchMembers() {
      try {
        const fetchedMembs = await axios.get(
          `http://localhost:2021/api/document/${documentId}/members`,
          {
            withCredentials: true,
          },
        );

        setMembers(fetchedMembs.data.members ?? []);
      } catch (err) {
        console.log(err);
        toast.error("Couldn't fetch members");
      }
    }

    fetchMembers();
  }, [user, documentId]);

  return (
    <div
      className={`modalBackdrop ${isClosing ? "isClosing" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`loginModal ${isDark ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="closeButton">
          <X />
        </button>

        <div className="ShareContent">
          <div
            className="shareMeta"
            style={{ color: "gray", cursor: "pointer" }}
            onClick={() => {
              switchTab("share");
            }}
          >
            <ArrowLeft size={22} />
            <span>Back</span>
          </div>
          <h2>Manage Members</h2>
          <p className="shareSubtitle">Edit members and their permission.</p>

          <div className="MembersContainer">
            {members.length === 0 ? (
              <p className="membersMessage">No members yet...</p>
            ) : (
              members.map((member) => (
                <ManageUser
                  key={member.id}
                  username={member.user.username}
                  email={member.user.email}
                  role={member.role}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageMembersModal;
