import { useMemo } from "react";
import { NavLink, useLocation } from "react-router";

export const Header = () => {
  const {pathname} = useLocation()

  const navItems = useMemo(
    () => [
      { to: "/", label: "Home", end: true },
      { to: "/projects", label: "Projects" },
      { to: "/cv", label: "CV" },
    ],
    []
  );

  return (
    <header className="bg-white fixed top-0 left-0 w-full shadow-xl z-100">
      <div className="container mx-auto max-w-[1280px]  p-4 flex justify-between items-center">
        <div className="flex-row flex gap-x-1 items-center">
          <img
            src="./img/profile.jpeg"
            alt="Logo"
            className="h-10 w-10 mr-2 rounded-full"
          />
          <span className="text-xl font-semibold">twinedo</span>
        </div>
        <nav className="flex gap-x-4">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              <div
                className={
                  pathname === item.to
                    ? "text-gray-700 font-medium"
                    : "text-gray-400"
                }
              >
                {item.label}
              </div>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
