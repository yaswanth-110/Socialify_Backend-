import { Outlet, defer, json } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const PostsLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PostsLayout;

async function loadPosts() {
  console.log("into posts");
  const response = await fetch("http://localhost:3000/feed/posts", {
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch posts." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export function loader() {
  return defer({
    data: loadPosts(),
  });
}
