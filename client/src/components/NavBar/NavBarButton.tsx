type INavBarButton = {
  icon: React.ReactNode;
  onClick: () => void;
};

export function NavBarButton({ icon, onClick }: INavBarButton) {
  return (
    <div onClick={onClick} className="navBarButton">
      {icon} 
    </div>
  );
}
