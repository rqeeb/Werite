import { Clock, Download, PanelRight, Share2 } from "lucide-react";
import { NavBarButton } from "./NavBarButton";
import { NavBarStaticIcon } from "./NavBarStaticIcon";
import { useEffect, useState } from "react";

type IRightNavBar = {
  exportMD: () => void;
  openModal: () => void;
  openSidebar: () => void;
  isSaving: string;
};

export function RightNavBar({
  exportMD,
  openModal,
  openSidebar,
  isSaving,
}: IRightNavBar) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rightNavBar">
      <div className="rightNavBarLeftContainer">
        <div className="clockContainer">
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
          icon={<Share2 size={20} strokeWidth={2} />}
          onClick={openModal}
        />

        <NavBarButton
          icon={<PanelRight size={20} strokeWidth={2} />}
          onClick={openSidebar}
        />
      </div>

      <div className="isSaving">
        {isSaving == "saved" && (
          <div className="saveStatus">
            <span className="savedDot green"></span>
            <span>Saved</span>
          </div>
        )}
        {isSaving == "saving" && (
          <div className="saveStatus">
            <span className="savedDot blue"></span>
            <span>Saving...</span>
          </div>
        )}
        {isSaving == "couldnt save" && (
          <div className="saveStatus">
            <span className="savedDot red"></span>
            <span>Couldn't save</span>
          </div>
        )}
        {isSaving == "saved locally" && (
          <div className="saveStatus">
            <span className="savedDot green"></span>
            <span>Saved locally</span>
          </div>
        )}

      </div>
    </div>
  );
}
