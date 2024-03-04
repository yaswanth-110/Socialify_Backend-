import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import PostForm from "./PostForm";
import { PageStatus } from "../../store/PageStatusProvder";

const PostEdit = () => {
  const pageStatusCtx = useContext(PageStatus);

  const [image, setImage] = useState({
    url: "",
  });
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const open = pageStatusCtx.path === "/posts/id/edit";
  console.log(open);

  const handleImageChange = (event) => {
    setImage(() => {
      return {
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
          method={"PUT"}
          path={"/posts/edit"}
          data={{ image: image.file, description }}
          buttonCaption={"Save"}
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

export default PostEdit;
