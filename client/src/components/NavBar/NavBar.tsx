import { LeftNavBar } from "./LeftNavBar";
import { RightNavBar } from "./RightNavBar";
import "./NavBar.css";

type INavBar = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  currentFontSize: number;
  toggleTheme: () => void;
};

export function NavBar({
  onZoomIn,
  onZoomOut,
  currentFontSize,
  toggleTheme,
}: INavBar) {
  return (
    <div className="navBarContainer">
      <LeftNavBar
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        currentFontSize={currentFontSize}
        toggleTheme={toggleTheme}
      />
      <RightNavBar />
    </div>
  );
}

//Two navs
// -->first: zoom in zoom out  / toggle light --> DONE
// -->second: time / export
// -->seprate button on left for invite
