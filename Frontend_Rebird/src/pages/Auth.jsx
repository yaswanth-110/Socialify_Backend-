import { json, redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import { getAuthToken } from "../util/auth";
import logo from "/images/rebird.png";

const Auth = () => {
  return (
    <div className="flex justify-center items-center">
      <AuthForm />
      <div className="p-12 flex flex-col items-center justify-center">
        <div className="">
          <header className="mb-4">
            <h1 className="font-bold text-2xl">
              Welcome to the <span className="text-green_mx">Rebird!</span>
            </h1>
            <p>Rebird the posts, likes and comments!</p>
          </header>
        </div>
        <img src={logo} alt="A Bird icon" className="w-96 h-96" />
      </div>
    </div>
  );
};

export default Auth;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");

  console.log(mode);

  const formData = await request.formData();
  const authData = Object.fromEntries(formData.entries());

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (mode === "login") {
    config.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    };
  }
  const response = await fetch("http://localhost:3000/auth/" + mode, {
    ...config,
    body: JSON.stringify(authData),
  });

  const resData = await response.json();

  if (!response.ok) {
    return json(
      { message: resData.message, errors: resData.errorData },
      { status: 500 }
    );
  }

  if (resData.token && resData.userId) {
    localStorage.setItem("token", resData.token);
    localStorage.setItem("userId", resData.userId);
  }

  if (resData.userDetails) {
    localStorage.setItem("user", resData.userDetails);
  }

  return redirect("/posts");
}
