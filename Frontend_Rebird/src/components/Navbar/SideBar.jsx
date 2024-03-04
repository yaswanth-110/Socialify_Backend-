import { CircleUserRound } from "lucide-react";
import logo from "/images/rebird.png";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const user = localStorage.getItem("user");
  // console.log("user", user.username);

  return (
    <aside className="h-screen sticky top-0">
      <nav className="h-full w-72 m-0 bg-gray-200 flex flex-col p-4 left-0">
        <NavLink to={"/posts"} className="flex items-center h-12 gap-2 mb-6">
          <img src={logo} className="w-12 h-12 rounded-full"></img>
          <span className="font-bold text-green_mx text-xl">Rebird</span>
        </NavLink>

        <ul className="flex-1">{children}</ul>

        <NavLink
          to={"/profile"}
          className="py-2 px-4 flex items-center gap-4 bg-gray-100 rounded-md"
        >
          <CircleUserRound size={34} className="rounded-md" />
          <div className="flex items-start flex-col">
            <h4>{user.username}</h4>
            <span>{user.name}</span>
          </div>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
