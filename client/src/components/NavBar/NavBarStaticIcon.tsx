type INavBarStaticIcon = {
  icon: React.ReactNode;
};

export function NavBarStaticIcon({ icon}: INavBarStaticIcon) {
  return (
    <div className="navBarStaticIcon" style={{color:"grey"}}>
      {icon}
    </div>
  );
}
