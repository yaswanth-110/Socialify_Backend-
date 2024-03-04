import { Outlet, defer, json } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const ProfileLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProfileLayout;

async function loadUser(request) {
  console.log("into load user");
  const searchParams = new URL(request.url).searchParams;
  const username = searchParams.get("username");

  let url = "http://localhost:3000/user/";

  if (!username) {
    url += "userProfile";
  } else {
    url += username;
  }

  localStorage.getItem("userId");

  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not get user profile" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

export function loader({ request }) {
  return defer({
    profile: loadUser(request),
  });
}
