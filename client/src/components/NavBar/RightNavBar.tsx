import { Clock } from "lucide-react";
import { NavBarButton } from "./NavBarButton";
import { NavBarStaticIcon } from "./NavBarStaticIcon";
import { useEffect, useState } from "react";

export function RightNavBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rightNavBar">
      <NavBarStaticIcon icon={<Clock />} />
      <div>{time.toLocaleTimeString()}</div>
    </div>
  );
}
