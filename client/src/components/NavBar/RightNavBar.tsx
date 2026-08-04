import { Clock } from "lucide-react";
import { NavBarButton } from "./NavBarButton"
import { NavBarStaticIcon } from "./NavBarStaticIcon";

export function RightNavBar() {
  return (
    <div className="rightNavBar">
      <NavBarStaticIcon icon={<Clock/>} onClick={()=>{}}/> 
      <div>FOUR</div>
    </div>
  );
}
