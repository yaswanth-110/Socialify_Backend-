import { useRef } from "react";
import { json, redirect } from "react-router-dom";

import Button from "../UI/Button";
import Input from "../UI/Input";
import { PlusCircle } from "lucide-react";
import { getAuthToken } from "../../util/auth";

const PostForm = ({ onImageChange, isEditing, image, onTextChange }) => {
  const inputRef = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  return (
    <>
      <div className="flex items-center gap-2 flex-col">
        <div className="flex items-center gap-2 mb-2">
          <PlusCircle color="grey" />
          <p className="font-bold text-xl text-greenDark_mx uppercase opacity-50">
            {isEditing ? "Edit Post" : "Add Post"}
          </p>
        </div>
        {isEditing && (
          <img src={image.url} className="w-60 h-60 object-contain" />
        )}
      </div>
      <div className="flex justify-center flex-col p-12 gap-4">
        <div className="flex justify-center">
          <input
            ref={inputRef}
            onChange={(event) => onImageChange(event)}
            style={{ display: "none" }}
            type="file"
          />
          <Button onClick={handleClick} type="button">
            {isEditing ? "Replace Photo" : "Select from computer"}
          </Button>
        </div>
        <div>
          <Input
            label={"Description"}
            textarea
            defaultValue={isEditing ? "" : ""}
            onChange={(event) => onTextChange(event)}
          />
        </div>
      </div>
    </>
  );
};

export default PostForm;

export async function action({ request }) {
  console.log("in add post");
  const formData = await request.formData();

  const postData = Object.fromEntries(formData.entries());

  console.log(postData);

  if (Object.keys(postData).length === 0) {
    console.log("closed create post");
    return redirect("/posts");
  }

  const response = await fetch("http://localhost:3000/feed/post", {
    method: request.method,
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
    body: formData,
  });

  if (!response.ok) {
    throw json({ message: "Could not Upload post" }, { status: 500 });
  }

  return redirect("/posts");
}
