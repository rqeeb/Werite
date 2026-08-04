import { Sun, ZoomIn, ZoomOut } from "lucide-react";
import { NavBarButton } from "./NavBarButton";



type ILeftNavBar = {
  onZoomIn: ()=>void,
  onZoomOut: ()=>void
  currentFontSize:number
  toggleTheme:()=>void,
}



export function LeftNavBar({onZoomIn,onZoomOut,currentFontSize,toggleTheme}:ILeftNavBar) {
  

  return (
    <div className="leftNavBar">

      <NavBarButton
        icon={<ZoomOut size={22} strokeWidth={2} />}
        onClick={onZoomOut}
      />
      <div>{currentFontSize}px</div>
      <NavBarButton
        icon={<ZoomIn size={22} strokeWidth={2} />}
        onClick={onZoomIn}
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
        onClick={toggleTheme}
      />
    </div>
  );
}
