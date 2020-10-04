import React, { useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Table from "components/common/Table";
import { currentUserState } from "store/github";

export default ({ users }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Login",
        accessor: "login",
      },
      {
        Header: "Contributions",
        accessor: "contributions",
        sortType: "basic",
      },
      {
        Header: "Followers",
        accessor: "followers",
        sortType: "basic",
      },
      {
        Header: "Public repositories",
        accessor: "public_repos",
        sortType: "basic",
      },
      {
        Header: "Public gists",
        accessor: "public_gists",
        sortType: "basic",
      },
    ],
    []
  );

  const setCurrentUser = useSetRecoilState(currentUserState);

  const history = useHistory();
  const navigateToUser = useCallback(
    ({ login }) => {
      const user = users.find((u) => u.login === login);
      setCurrentUser(user);
      history.push(`/user/${login}`);
    },
    [users, setCurrentUser, history]
  );

  return <Table columns={columns} data={users} navigateTo={navigateToUser} />;
};
