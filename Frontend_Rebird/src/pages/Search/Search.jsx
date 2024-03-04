import { Search } from "lucide-react";

const SearchUtil = () => {
  return (
    <div className=" flex-1 m-12">
      <div className="flex flex-row">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Search username..."
          className="w-[50%] mr-4 px-2 py-2 focus:outline-none bg-gray-200 rounded-md focus:bg-gray-300 cursor-text"
        />
        <button className="bg-lightGreen_sm hover:bg-lightGreen_mx rounded-md p-2">
          <Search />
        </button>
      </div>
    </div>
  );
};

export default SearchUtil;
