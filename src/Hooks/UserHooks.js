import { useState } from "react";
import { getLoggedinUser } from "../helpers/api_helper";
import axiosClient from "../helpers/axiosClient";

const useProfile = () => {
  const userProfileSession = getLoggedinUser();
  const [loading] = useState(userProfileSession ? false : true);
  const [userProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  if (userProfile) {
    axiosClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userProfile.access_token}`;
  }

  return { userProfile, loading };
};

export { useProfile };
