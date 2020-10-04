import React, { useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";

import Table from "components/common/Table";

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

  const history = useHistory();
  const navigateToUser = useCallback(
    ({ login }) => {
      history.push(`/user/${login}`);
    },
    [history]
  );

  return <Table columns={columns} data={users} navigateTo={navigateToUser} />;
};
