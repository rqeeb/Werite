type INavBarStaticIcon = {
  icon: React.ReactNode;
  onClick: () => void;
};

export function NavBarStaticIcon({ icon, onClick }: INavBarStaticIcon) {
  return (
    <div onClick={onClick} className="navBarStaticIcon" style={{color:"grey"}}>
      {icon}
    </div>
  );
}
