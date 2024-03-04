import { Await, useRouteError, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import PostsList from "../../components/Posts/PostsList";

const Posts = () => {
  const { data } = useRouteLoaderData("posts-root");

  return (
    <Suspense fallback={""}>
      <Await resolve={data}>
        {(loadedData) => {
          return <PostsList loadedData={loadedData} />;
        }}
      </Await>
    </Suspense>
  );
};

export default Posts;
