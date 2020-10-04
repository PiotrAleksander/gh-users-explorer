import React from "react";
import { useRecoilValue } from "recoil";

import { userQuery } from "store/github";
import UserView from "components/views/UserView";

export default () => {
  const repositories = useRecoilValue(userQuery());
  return <UserView repositories={repositories} />;
};
