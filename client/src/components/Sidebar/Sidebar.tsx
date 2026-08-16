import { Library, Search } from "lucide-react";
import "./Sidebar.css";
import { SidebarDocument } from "./SidebarDocument";

type User = {
  id: string;
  username: string;
  email: string;
};

type SidebarProps = {
  isSidebarOpen: boolean;
  user: User | null;
  openLogin: () => void;
  checkAuthLoading: boolean;
  isDark: boolean;
};

export function Sidebar({
  isSidebarOpen,
  user,
  openLogin,
  checkAuthLoading,
  isDark,
}: SidebarProps) {
  return (
    <div className={`sidebarContainer ${isSidebarOpen ? "open" : ""}`}>
      {user ? (
        <div className={`innerSidebarContainer `}>
          <div className="sidebarHeader">
            <Library size={28} />
            <span>Werite</span>
          </div>

          <div className={`sidebarSearch ${isDark ? "light" : "dark"}`}>
            <Search size={17} />
            <input type="text" placeholder="Search documents..." />
          </div>

          <div className="sidebarDocumentContainer">
            <SidebarDocument />
            <SidebarDocument />
          </div>
        </div>
      ) : checkAuthLoading ? (
        <div className="sidebarSpinnerContainer">
          <span className={`sidebarSpinner ${isDark ? "light" : "dark"}`} />
        </div>
      ) : (
        <div className={`sidebarLoggedOut ${isDark ? "light" : "dark"}`}>
          <div className={`sidebarLoggedOutIcon ${isDark ? "light" : "dark"}`}>
            <Library size={26} />
          </div>

          <h3>Your docs live here</h3>

          <p>Log in to view, create, and manage your docs.</p>

          <button
            type="button"
            className={`sidebarLoginButton ${isDark ? "light" : "dark"}`}
            onClick={openLogin}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}
