import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import Post from "../../components/Posts/Post";

const PostDetail = () => {
  const { data } = useLoaderData();

  return (
    <Suspense>
      <Await resolve={data}>
        {(loadedData) => {
          console.log(loadedData);
          return <Post post={loadedData} />;
        }}
      </Await>
    </Suspense>
  );
};

export default PostDetail;

// export function dummyAction() {
//   return defer({
//     data: "",
//   });
// }

async function loadPost(id) {
  const response = await fetch("http://localhost:3000/feed/edit-post/" + id, {
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected post." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.post;
  }
}

export async function loader({ params }) {
  const { postId } = params;

  return defer({
    data: loadPost(postId),
  });
}

export async function action({ params, request }) {
  const { postId } = params;
  console.log("delete post", postId);
  const response = await fetch("http://localhost:3000/feed/" + postId, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete post." },
      {
        status: 500,
      }
    );
  }
  return redirect("/profile");
}
