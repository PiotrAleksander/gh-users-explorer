import React from "react";
import { useRecoilValue } from "recoil";

import { userQuery } from "store/github";
import UserView from "components/views/UserView";
import { useParams } from "react-router-dom";

export default () => {
  const { login } = useParams();
  const repositories = useRecoilValue(userQuery(login));
  return <UserView repositories={repositories} />;
};
