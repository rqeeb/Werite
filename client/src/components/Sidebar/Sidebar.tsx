type SidebarProps = {
  isSidebarOpen: boolean;
};
import { Library } from "lucide-react";
import "./Sidebar.css";
import { SidebarDocument } from "./SidebarDocument";

export function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <div className={`sidebarContainer ${isSidebarOpen ? "open" : ""}`}>
      <div style={{ display: "flex" }}>
        <Library />
        <span>Werite</span>
      </div>
      <div>
        <input type="text" />
        <button>Search</button>
      </div>
      <div>
        <SidebarDocument/>
        <SidebarDocument/>
        <SidebarDocument/>
        <SidebarDocument/>
      </div>
    </div>
  );
}
