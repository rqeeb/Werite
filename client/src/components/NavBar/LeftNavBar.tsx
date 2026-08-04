import { Sun, ZoomIn, ZoomOut } from "lucide-react";
import { NavBarButton } from "./NavBarButton";
import { useState } from "react";


type ILeftNavBar = {
  onZoomIn: ()=>void,
  onZoomOut: ()=>void
  currentFontSize:number
}



export function LeftNavBar({onZoomIn,onZoomOut,currentFontSize}:ILeftNavBar) {
  

  // function zoomIn() {
  //   setcurrentFontSize((prev) => Math.min(prev + 2, 32));
  // }

  // function zoomOut() {
  //   alert("zoomedIn");
  // }

  function changeBg() {}

  return (
    <div className="leftNavBar">
      <NavBarButton
        icon={<ZoomIn size={22} strokeWidth={2} />}
        onClick={onZoomIn}
      />

      <div>{currentFontSize}px</div>

      <NavBarButton
        icon={<ZoomOut size={22} strokeWidth={2} />}
        onClick={onZoomOut}
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
        onClick={changeBg}
      />
    </div>
  );
}
