import { Library, Search } from "lucide-react";
import "./Sidebar.css";
import { SidebarDocument } from "./SidebarDocument";

type user = {
  id: string;
  username: string;
  email: string;
};

type SidebarProps = {
  isSidebarOpen: boolean;
  user: user | null;
  openLogin: () => void;
};

export function Sidebar({ isSidebarOpen, user, openLogin }: SidebarProps) {
  return (
    <div className={`sidebarContainer ${isSidebarOpen ? "open" : ""}`}>
      {user ? (
        <div className="innerSidebarContainer">
          <div className="sidebarHeader">
            <Library size={28} />
            <span>Werite</span>
          </div>

          <div className="sidebarSearch">
            <Search size={17} />
            <input type="text" placeholder="Search documents..." />
            <Library />
          </div>

          <div className="sidebarDocumentContainer">
            <SidebarDocument />
            <SidebarDocument />
          </div>
        </div>
      ) : (
        <div>
          <button
            style={{ justifyContent: "center", alignItems: "center" }}
            onClick={openLogin}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
