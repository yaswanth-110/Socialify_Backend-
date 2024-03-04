import { useContext, useState } from "react";

import { PageStatus } from "../../store/PageStatusProvder";
import Modal from "../UI/Modal";
import ProfileEditForm from "./ProfileEditForm";
import { ProfileContext } from "../../store/ProfileProvider";

const ProfileEdit = () => {
  const pageStatusCtx = useContext(PageStatus);
  const open = pageStatusCtx.path === "/profile/edit";

  const profileCtx = useContext(ProfileContext);
  const profileData = profileCtx.profile.userDetails;

  const [image, setImage] = useState({
    url: "",
  });
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState("");

  const handleImageChange = (event) => {
    setImage(() => {
      return {
        url: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      };
    });
    setIsEditing(true);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      {open && (
        <Modal
          method={"PUT"}
          path={"/profile/edit"}
          data={{
            image: image.file,
            name,
            bio,
            username: profileData.username,
          }}
          buttonCaption={"Save"}
        >
          <ProfileEditForm
            // path={"/posts/new"}
            onImageChange={handleImageChange}
            onNameChange={handleNameChange}
            onBioChange={handleBioChange}
            data={{ image, name, bio }}
            isEditing={isEditing}
            profileData={profileData}
          />
        </Modal>
      )}
    </>
  );
};

export default ProfileEdit;
