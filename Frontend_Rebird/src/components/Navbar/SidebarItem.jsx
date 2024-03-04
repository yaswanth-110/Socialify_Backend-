import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { PageStatus } from "../../store/PageStatusProvder";

const SidebarItem = ({ Icon, text, path }) => {
  const pageStatusCtx = useContext(PageStatus);

  let cssClass =
    "flex gap-4 py-2 px-3 mb-2 rounded-md hover:bg-lightGreen_sm hover:text-greenDark";

  const handleClick = () => {
    console.log(path);
    pageStatusCtx.changePath(path);
  };

  return (
    <li>
      <NavLink to={`${path}`} onClick={handleClick}>
        {({ isActive }) => (
          <div
            className={
              isActive
                ? cssClass + " bg-lightGreen_sm text-greenDark"
                : cssClass
            }
          >
            <Icon />
            <span
              className={
                isActive
                  ? "font-bold  text-greenDark"
                  : "font-medium text-gray-600"
              }
            >
              {text}
            </span>
          </div>
        )}
      </NavLink>
    </li>
  );
};

export default SidebarItem;
