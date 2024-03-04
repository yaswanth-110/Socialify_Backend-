import { Outlet, useLoaderData } from "react-router-dom";

import { Navbar } from "../components/Navbar";

const RootLayout = () => {
  const data = useLoaderData();
  const notAuthorized = data && data.message === "NOT AUTHENTICATED";

  let cssClass = "flex";
  if (notAuthorized) {
    cssClass = "flex justify-center items-center h-screen w-screen";
  }
  return (
    <div className={cssClass}>
      {!notAuthorized && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
