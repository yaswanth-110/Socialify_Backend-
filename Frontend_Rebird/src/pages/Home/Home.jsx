import logo from "/images/rebird.png";

import "./Home.css";
import { NavLink } from "react-router-dom";
import { PageStatus } from "../../store/PageStatusProvder";
import { useContext } from "react";

import Button from "../../components/UI/Button";

const HomePage = () => {
  const pageStatusCtx = useContext(PageStatus);

  console.log(pageStatusCtx.path);

  return (
    <div className="p-12 flex items-center justify-center">
      <div className="">
        <header className=" mb-8">
          <h1 className="font-bold text-2xl">
            Welcome to the <span className="text-green_mx">Rebird!</span>
          </h1>
          <p>Rebird the posts, likes and comments!</p>
          <p className="text-sm text-gray-400 mt-4 m-2">
            Rebirds are the gossips, secrets and likes shared on an Amazing
            platform called <span className="text-green_mx">REBIRD</span>
          </p>
        </header>
        <menu className="mb-6">
          <Button textonly>
            <NavLink to={`auth?mode=signup`}>Sign up</NavLink>
          </Button>
          <Button>
            <NavLink to={`auth?mode=login`}>Login</NavLink>
          </Button>
        </menu>
      </div>
      <img src={logo} alt="A Bird icon" className="w-96 h-96 container" />
    </div>
  );
};

export default HomePage;
