import {
  Bell,
  Home,
  LogOut,
  PlusCircle,
  Search,
  Send,
  Waypoints,
} from "lucide-react";
import Sidebar from "./SideBar";
import SidebarItem from "./SidebarItem";
import { Form } from "react-router-dom";

const Navbar = () => {
  return (
    <Sidebar>
      <SidebarItem Icon={Home} text={"Home"} path={"/posts"} />
      <SidebarItem Icon={Search} text={"Search"} path={"/search"} />
      <SidebarItem Icon={Send} text={"Messages"} path={"/messages"} />
      <SidebarItem
        Icon={PlusCircle}
        text={"Create a Post"}
        path={"/posts/new"}
      />
      <SidebarItem Icon={Bell} text={"Notifications"} path={"/notifications"} />
      <SidebarItem
        Icon={Waypoints}
        text={"Connections"}
        path={"/connections"}
      />
      <Form action="/logout" method="POST">
        <li>
          <button className="flex gap-4 py-2 px-3 mb-2 rounded-md text-red-600 mt-8">
            <LogOut />
            <span className="">Logout</span>
          </button>
        </li>
      </Form>
    </Sidebar>
  );
};

export default Navbar;
