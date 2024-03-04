import { Suspense, useContext } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import ProfileDetail from "../../components/Profile/ProfileDetail";
import PostsList from "../../components/Posts/PostsList";
import { ProfileContext } from "../../store/ProfileProvider";

const Profile = () => {
  const { profile } = useRouteLoaderData("profile-root");

  const profileCtx = useContext(ProfileContext);

  return (
    <>
      <Suspense>
        <Await resolve={profile}>
          {(loadedProfile) => {
            // profileCtx.setProfile(loadedProfile);
            return (
              <>
                <ProfileDetail profileData={loadedProfile} />
                <PostsList loadedData={loadedProfile} />
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default Profile;
