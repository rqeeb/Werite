import { Sun, ZoomIn, ZoomOut } from "lucide-react";
import { NavBarButton } from "./NavBarButton";
import { useState } from "react";

export function LeftNavBar() {

  const [size,setSize] = useState(20);


  function zoomIn() {
    alert("zoomedIn");
  }

  function zoomOut() {
    alert("zoomedIn");
  }

  return (
    <div className="leftNavBar">
      <NavBarButton
        icon={<ZoomIn size={22} strokeWidth={2} />}
        onClick={zoomIn}
      />


      <div >
        {size}px
      </div>

      <NavBarButton
        icon={<ZoomOut size={22} strokeWidth={2} />}
        onClick={zoomOut}
      />
      <div
        style={{
          width: "1px",
          height: "34px",
          backgroundColor: "grey",
        }}
      />
      <NavBarButton
        icon={<Sun size={22} strokeWidth={2} />}
        onClick={zoomOut}
      />
    </div>
  );
}
