import { Outlet } from "react-router-dom";
import SearchUtil from "./Search/Search";

const SearchLayout = () => {
  return (
    <>
      <SearchUtil />
      <Outlet />
    </>
  );
};

export default SearchLayout;
