import React from "react";
import { useRecoilValue } from "recoil";

import { organizationQuery } from "store/github";
import OrganizationView from "components/views/OrganizationView";

export default () => {
  const users = useRecoilValue(organizationQuery);
  return <OrganizationView users={users} />;
};
