import React, { useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { Table } from "components/common";
import { currentUserState } from "store/github";

export default ({ users }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "avatar_url",
        Cell: ({ row }) => (
          <img src={row.values.avatar_url} alt="User's avatar" />
        ),
        disableSortBy: true,
      },
      {
        Header: "Login",
        accessor: "login",
        disableSortBy: true,
      },
      {
        Header: "Contributions",
        accessor: "contributions",
        sortType: "basic",
        sortDescFirst: true,
      },
      {
        Header: "Followers",
        accessor: "followers",
        sortType: "basic",
        sortDescFirst: true,
      },
      {
        Header: "Public repositories",
        accessor: "public_repos",
        sortType: "basic",
        sortDescFirst: true,
      },
      {
        Header: "Public gists",
        accessor: "public_gists",
        sortType: "basic",
        sortDescFirst: true,
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
