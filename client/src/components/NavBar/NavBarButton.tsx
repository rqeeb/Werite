import { ZoomIn } from "lucide-react";

type INavBarButton = {
  icon: React.ReactNode;
  onClick: () => void;
};

export function NavBarButton({ icon, onClick }: INavBarButton) {
  return (
    <div onClick={onClick} className="NavBarButton">
      {icon}
    </div>
  );
}
