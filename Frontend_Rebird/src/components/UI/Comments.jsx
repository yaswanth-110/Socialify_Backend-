import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useSubmit } from "react-router-dom";

const Comments = ({ comments }) => {
  const zeroComments = comments.length === 0;

  const submit = useSubmit();
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append("comment", comment);
    submit(formData, { method: "PUT" });
  };

  return (
    <div className="flex w-[60%] flex-col">
      <section className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Comment on this Rebird"
          defaultValue={comment}
          onChange={handleChange}
          className="bg-gray-200 px-4 py-1 rounded-full w-full focus:outline-none"
        />
        <SendHorizonal
          onClick={handleClick}
          size={30}
          className="p-1 bg-lightGreen rounded-full"
        />
      </section>
      <ul className="flex items-start gap-2 flex-col p-4 bg-gray-200 shadow-md rounded-md mt-2 overflow-clip">
        <h1 className="text-base font-bold text-green_mx">Comments</h1>
        {zeroComments && <>No comments yet</>}
        {comments.map((postComment) => (
          <li
            key={postComment.username}
            className="flex flex-col items-start bg-gray-100 rounded-md px-2"
          >
            <div className="font-medium">{postComment.username}</div>
            <div className="text-left text-gray-600">{postComment.comment}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
