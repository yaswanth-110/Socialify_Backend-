import { createContext, useState } from "react";

export const ProfileContext = createContext({
  profile: {},
  setProfile: () => {},
});

const ProfileProvder = ({ children }) => {
  const [profile, setProfile] = useState({});

  const handleSetProfile = (profile) => {
    setProfile(profile);
  };
  const profileCtx = { profile: profile, setProfile: handleSetProfile };

  return (
    <ProfileContext.Provider value={profileCtx}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvder;
