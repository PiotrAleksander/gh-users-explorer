import React from "react";
import { useRecoilValue } from "recoil";

import { organizationQuery } from "store/github";
import OrganizationView from "components/views/OrganizationView";

export default () => {
  // const users = useRecoilValue(organizationQuery);
  const users = [];
  return <OrganizationView users={users} />;
};
