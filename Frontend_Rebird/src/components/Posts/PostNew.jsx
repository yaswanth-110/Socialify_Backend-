import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import PostForm from "./PostForm";
import { PageStatus } from "../../store/PageStatusProvder";

const PostNew = () => {
  const [image, setImage] = useState({
    url: "",
  });
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const pageStatusCtx = useContext(PageStatus);
  const open = pageStatusCtx.path === "/posts/new";

  const handleImageChange = (event) => {
    console.log("click");
    setImage((prevState) => {
      return {
        ...prevState,
        url: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      };
    });

    setIsEditing(true);
  };

  const handleOnChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <>
      {open && (
        <Modal
          method={"POST"}
          path={"/posts/new"}
          data={{ image: image.file, description }}
          buttonCaption={"Post"}
        >
          <PostForm
            onImageChange={handleImageChange}
            isEditing={isEditing}
            image={image}
            onTextChange={handleOnChange}
          />
        </Modal>
      )}
    </>
  );
};

export default PostNew;
