import { ZoomIn } from "lucide-react";
import { NavBarButton } from "./NavBarButton";

export function LeftNavBar() {
  function zoomIn() {
    alert("zoomedIn");
  }

  return (
    <div className="LeftNavBar">
      <NavBarButton icon={<ZoomIn />} onClick={zoomIn} />
      <NavBarButton icon={<ZoomIn />} onClick={zoomIn} />
      <NavBarButton icon={<ZoomIn />} onClick={zoomIn} />
    </div>
  );
}
