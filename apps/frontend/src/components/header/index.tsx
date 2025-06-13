import { NavLink } from "react-router";

export const Header = () => {
  return (
    <header className="bg-white fixed top-0 left-0 w-full shadow-2xs z-10 p-4">
      <div className="container mx-auto max-w-[1280px] flex justify-between items-center">
        <div className="flex-row flex gap-x-1 items-center">
          <img src="./img/profile.jpeg" alt="Logo" className="h-10 w-10 mr-2 rounded-full" />
          <span className="text-xl font-semibold">twinedor</span>
        </div>
        <nav className="flex gap-x-4">
          <NavLink to="/" end className={({ isActive }) => isActive ? "text-blue-500" : "text-gray-700"}>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "text-blue-500" : "text-gray-700"}>
            Projects
          </NavLink>
          <NavLink to="/cv" className={({ isActive }) => isActive ? "text-blue-500" : "text-gray-700"}>CV</NavLink>
        </nav>
      </div>
    </header>
  );
};
