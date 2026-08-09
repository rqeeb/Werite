import { Maximize2, Minimize2, Sun, ZoomIn, ZoomOut } from "lucide-react";
import { NavBarButton } from "./NavBarButton";
import { useEffect, useState } from "react";

type ILeftNavBar = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  currentFontSize: number;
  toggleTheme: () => void;
};

export function LeftNavBar({
  onZoomIn,
  onZoomOut,
  currentFontSize,
  toggleTheme,
}: ILeftNavBar) {
  const [fullScreen, setFullScreen] = useState(false);
  useEffect(() => {
    function handleFullscreenChange() {
      setFullScreen(document.fullscreenElement !== null);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  async function toggleFullScreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen failed:", error);
    }
  }

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
          height: "28px",
          backgroundColor: "grey",
        }}
      />
      <NavBarButton
        icon={<Sun size={22} strokeWidth={2} />}
        onClick={toggleTheme}
      />
      <NavBarButton
        icon={
          fullScreen ? (
            <Minimize2 size={20} strokeWidth={2} />
          ) : (
            <Maximize2 size={20} strokeWidth={2} />
          )
        }
        onClick={toggleFullScreen}
      />
    </div>
  );
}
