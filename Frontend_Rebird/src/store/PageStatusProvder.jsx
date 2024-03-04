import { createContext, useState } from "react";

export const PageStatus = createContext({
  path: "",
  changePath: () => {},
});

const PageStatusProvder = ({ children }) => {
  const [path, setPath] = useState("");
  const handleSetPagePath = (path) => {
    setPath(path);
  };
  const pageStatusCtx = { path: path, changePath: handleSetPagePath };

  return (
    <PageStatus.Provider value={pageStatusCtx}>{children}</PageStatus.Provider>
  );
};

export default PageStatusProvder;
