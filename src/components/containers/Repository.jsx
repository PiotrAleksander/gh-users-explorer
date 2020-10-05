import React from "react";
import { useRecoilValue } from "recoil";

import { repositoryQuery } from "store/github";
import { RepositoryView } from "components/views";
import { useParams } from "react-router-dom";

export default () => {
  const { owner, name } = useParams();
  const users = useRecoilValue(repositoryQuery({ owner, name }));
  return <RepositoryView users={users} />;
};
