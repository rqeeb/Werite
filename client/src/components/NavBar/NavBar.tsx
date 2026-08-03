import { LeftNavBar } from "./LeftNavBar";
import { RightNavBar } from "./RightNavBar";
import "./NavBar.css"

export function NavBar() {
  return (
    <div className="NavBarContainer">
      <LeftNavBar/>
      <RightNavBar/>
    </div>
  );
}


//Two navs
// -->first: zoom in zoom out  / toggle light 
// -->second: time / export
// -->seprate button on left for invite