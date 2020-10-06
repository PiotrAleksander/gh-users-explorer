import React from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";

import { organizationQuery } from "store/github";
import { OrganizationView } from "components/views";

export default () => {
  const { organization } = useParams();
  const users = useRecoilValue(organizationQuery(organization));
  return <OrganizationView users={users} />;
};
