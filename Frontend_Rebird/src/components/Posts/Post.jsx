import { useContext, useState } from "react";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import { Heart, MessageSquareMore, SquarePen, Trash } from "lucide-react";

import Comments from "../UI/Comments";
import { PageStatus } from "../../store/PageStatusProvder";

const Post = ({ post }) => {
  const { creator, likes, comments } = post;
  const token = useRouteLoaderData("root");

  const pageStatusCtx = useContext(PageStatus);

  const [isLike, setIsLike] = useState(false);
  const submit = useSubmit();

  // console.log(post);

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      console.log("submitting", proceed);
      submit(null, { method: "DELETE" });
    }
  }

  function handleLikePost() {
    setIsLike((prevLike) => !prevLike);
  }

  function handleSetPageStatus() {
    pageStatusCtx.changePath("/posts/id/edit");
  }

  const postActions = (
    <div className="flex items-center gap-2">
      <Link to={`/posts/${post._id}/edit`} onClick={handleSetPageStatus}>
        <SquarePen size={20} />
      </Link>
      <button onClick={startDeleteHandler}>
        <Trash size={18} color="red" opacity={0.6} />
      </button>
    </div>
  );

  // function handleCancel() {}

  const user = localStorage.getItem("user");
  const isOwner = post.username === user.username;

  return (
    <main className="flex flex-col items-center gap-4 mt-4 ml-12 mb-12 mr-48">
      <section className="bg-gray-200 shadow-md transition-shadow mb-[-4px] w-[60%]">
        <div className="flex flex-col rounded-sm overflow-hidden">
          <section className="flex justify-between items-center p-4">
            <div className="flex flex-1 gap-2 items-center">
              <img
                src={`http://localhost:3000/${creator.profileImageUrl}`}
                alt={creator.username}
                className="object-cover rounded-full w-8 h-8"
              />
              <h2 className="font-medium text-base">{creator.username}</h2>
            </div>

            {postActions}
          </section>
          <section className="flex">
            <img
              src={`http://localhost:3000/${post.imageUrl}`}
              alt={"post by someone"}
              className="object-contain"
            />
          </section>
          <section className="flex flex-1 items-start flex-col p-4">
            <p className="text-left">
              <span className="font-medium text-base">{creator.username} </span>
              {post.description}
            </p>
            <time className="text-gray-500 text-sm mt-2">{post.date}</time>
          </section>
          <section className="flex gap-2 bottom-0 p-4">
            <button onClick={handleLikePost}>
              <Heart fill={isLike ? "red" : "none"} />
            </button>
            <button>
              <MessageSquareMore />
            </button>
            {isLike && (
              <span className="text-sm text-gray-500">
                You liked this rebird
              </span>
            )}
          </section>
        </div>
      </section>
      <Comments comments={comments} />
    </main>
  );
};

export default Post;
