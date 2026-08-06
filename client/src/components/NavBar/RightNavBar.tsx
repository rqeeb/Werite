import { Clock, Download, Maximize2, Minimize2 } from "lucide-react";
import { NavBarButton } from "./NavBarButton";
import { NavBarStaticIcon } from "./NavBarStaticIcon";
import { useEffect, useState } from "react";

type IRightNavBar = {
  exportMD:()=>void;
}


export function RightNavBar({exportMD}:IRightNavBar) {
  const [time, setTime] = useState(new Date());
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    <div className="rightNavBar">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavBarStaticIcon icon={<Clock size={22} strokeWidth={2} />} />
        <div>{time.toLocaleTimeString()}</div>
      </div>

      <div
        style={{
          width: "1px",
          height: "22px",
          backgroundColor: "grey",
        }}
      />

      <NavBarButton
        icon={<Download size={22} strokeWidth={2} />}
        onClick={exportMD}
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
