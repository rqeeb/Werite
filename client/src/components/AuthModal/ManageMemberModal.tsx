import { ArrowLeft, User, X } from "lucide-react";
import "./modal.css";
import { useEffect, useState } from "react";
import {api} from "../../lib/api";
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
  const [membersLoading, setMembersLoading] = useState(false);

  function handleClose() {
    setIsClosing(true);
    setTimeout(onClose, 180);
  }

  async function updateMember(
    memberId: string,
    email: string,
    newRole: "EDITOR" | "VIEWER",
  ) {
    if (!documentId) return;

    try {
      await api.post(
        `/api/document/${documentId}/members`,
        {
          email,
          role: newRole,
        },
        {
          withCredentials: true,
        },
      );

      setMembers((p) =>
        p.map((member) =>
          member.id === memberId ? { ...member, role: newRole } : member,
        ),
      );

      toast.success("Permission updated");
    } catch (error) {
      console.log(error);
      toast.error("Couldn't update permission");
    }
  }

  async function removeMember(memberId: string) {
    if (!documentId) return;
    try {
      await api.delete(
        `/api/document/${documentId}/members/${memberId}`,
        {
          withCredentials: true,
        },
      );

      setMembers((previousMembers) =>
        previousMembers.filter((member) => member.id !== memberId),
      );

      toast.success("Member removed");
    } catch (err) {
      console.log(err);
      toast.error("Couldn't remove member");
    }
  }

  useEffect(() => {
    setMembersLoading(true);
    if (!user || !documentId) {
      setMembers([]);
      setMembersLoading(false);
      return;
    }

    async function fetchMembers() {
      try {
        const fetchedMembs = await api.get(
          `/api/document/${documentId}/members`,
          {
            withCredentials: true,
          },
        );

        setMembers(fetchedMembs.data.members ?? []);
      } catch (err) {
        console.log(err);
        toast.error("Couldn't fetch members");
      } finally {
        setMembersLoading(false);
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
            {membersLoading ? (
              <p className="membersMessage">Loading Members...</p>
            ) : members.length === 0 ? (
              <p className="membersMessage">No members yet...</p>
            ) : (
              members.map((member) => (
                <ManageUser
                  key={member.id}
                  username={member.user.username}
                  email={member.user.email}
                  role={member.role}
                  onUpdate={(newRole) =>
                    updateMember(member.id, member.user.email, newRole)
                  }
                  onRemove={() => removeMember(member.id)}
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
