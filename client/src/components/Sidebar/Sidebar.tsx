import { Library, Search } from "lucide-react";
import "./Sidebar.css";
import { SidebarDocument } from "./SidebarDocument";

type SidebarProps = {
  isSidebarOpen: boolean;
};

export function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <div className={`sidebarContainer ${isSidebarOpen ? "open" : ""}`}>
      <div className="innerSidebarContainer">
        <div className="sidebarHeader">
          <Library size={28} />
          <span>Werite</span>
        </div>

        <div className="sidebarSearch">
          <Search size={17} />
          <input type="text" placeholder="Search documents..." />
        </div>

        <div className="sidebarDocumentContainer">
          <SidebarDocument />
          <SidebarDocument />
          <SidebarDocument />
        </div>
      </div>
    </div>
  );
}
