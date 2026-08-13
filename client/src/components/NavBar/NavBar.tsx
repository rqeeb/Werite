import { LeftNavBar } from "./LeftNavBar";
import { RightNavBar } from "./RightNavBar";
import "./NavBar.css";

type INavBar = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  currentFontSize: number;
  toggleTheme: () => void;
  exportMD: () => void;
  openModal: () => void;
};

export function NavBar({
  onZoomIn,
  onZoomOut,
  currentFontSize,
  toggleTheme,
  exportMD,
  openModal,
}: INavBar) {
  return (
    <div className="navBarContainer" style={{
          zIndex:9999
        }}>
      <LeftNavBar
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        currentFontSize={currentFontSize}
        toggleTheme={toggleTheme}
      />
      <RightNavBar exportMD={exportMD} openModal={openModal} />
    </div>
  );
}

//Two navs
// -->first: zoom in zoom out  / toggle light --> DONE
// -->second: time / export
// -->seprate button on left for invite
