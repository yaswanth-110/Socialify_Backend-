import { useRef } from "react";
import { json, redirect } from "react-router-dom";

import Button from "../UI/Button";
import Input from "../UI/Input";
import { SquarePen } from "lucide-react";
import { getAuthToken } from "../../util/auth";
import emptyProfile from "/images/emptyProfile.png";

const ProfileEditForm = ({
  onImageChange,
  onNameChange,
  onBioChange,
  data,
  isEditing,
  profileData,
}) => {
  const inputRef = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  console.log(data.image);

  return (
    <>
      <div className="flex items-center gap-2 flex-col">
        <div className="flex items-center gap-2 mb-2">
          <SquarePen color="grey" />
          <p className="font-bold text-xl text-greenDark_mx uppercase opacity-50">
            Edit Profile
          </p>
        </div>
        <div className="w-[20%]">
          <img
            src={
              isEditing
                ? data.image.url
                : profileData.profileImageUrl === " "
                ? emptyProfile
                : `http://localhost:3000/${profileData.profileImageUrl}`
            }
            className="aspect-square object-cover rounded-full"
          />
        </div>
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
            Replace Profile picture
          </Button>
        </div>
        <div>
          <Input
            label={"Name"}
            defaultValue={profileData ? profileData.name : data.name}
            placeholder={"Eg. Rick Astley"}
            onChange={(event) => onNameChange(event)}
          />
          <Input
            label={"Bio"}
            textarea
            placeholder={"a short bio (20 characters max.)"}
            defaultValue={profileData ? profileData.bio : data.bio}
            onChange={(event) => onBioChange(event)}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileEditForm;

// export async function action({ request }) {
//   const formData = await request.formData();

//   const profileData = Object.fromEntries(formData.entries());

//   if (Object.keys(profileData).length === 0) {
//     return redirect("/profile");
//   }

//   const response = await fetch("http://localhost:3000/feed/post", {
//     method: request.method,
//     headers: {
//       Authorization: "Bearer " + getAuthToken(),
//     },
//     body: JSON.stringify(profileData),
//   });

//   if (!response.ok) {
//     throw json({ message: "Could not edit profile" }, { status: 500 });
//   }

//   return redirect("/profile");
// }

export async function action({ request }) {
  console.log("in edit profile");
  const formData = await request.formData();

  const profileData = Object.fromEntries(formData.entries());

  console.log(profileData);

  if (Object.keys(profileData).length === 0) {
    return redirect("/profile");
  }

  const response = await fetch("http://localhost:3000/user/userProfile", {
    method: request.method,
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
    body: formData,
  });

  if (!response.ok) {
    throw json({ message: "Could not edit profile" }, { status: 500 });
  }

  return redirect("/posts");
}
