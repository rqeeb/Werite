import { LeftNavBar } from "./LeftNavBar";
import { RightNavBar } from "./RightNavBar";
import "./NavBar.css"

type INavBar = {
  onZoomIn: ()=>void,
  onZoomOut: ()=>void,
  currentFontSize:number
}

export function NavBar({onZoomIn,onZoomOut,currentFontSize}:INavBar) {
  return (
    <div className="navBarContainer">
      <LeftNavBar onZoomIn={onZoomIn} onZoomOut={onZoomOut} currentFontSize={currentFontSize}  />
      <RightNavBar/>
    </div>
  );
}


//Two navs
// -->first: zoom in zoom out  / toggle light 
// -->second: time / export
// -->seprate button on left for invite