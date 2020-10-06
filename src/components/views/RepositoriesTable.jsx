import React, { useMemo, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import Table from "components/common/Table";
import { currentRepositoryState, currentUserState } from "store/github";
import { useRecoilValue } from "recoil";

export default ({ repositories }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Stars",
        accessor: "stargazers_count",
        sortType: "basic",
        sortDescFirst: true,
      },
      {
        Header: "Watchers",
        accessor: "watchers_count",
        sortType: "basic",
        sortDescFirst: true,
      },
      {
        Header: "Forks",
        accessor: "forks_count",
        sortType: "basic",
        sortDescFirst: true,
      },
    ],
    []
  );

  const setCurrentRepository = useSetRecoilState(currentRepositoryState);
  const currentUser = useRecoilValue(currentUserState);

  const history = useHistory();
  const navigateToRepository = useCallback(
    ({ name }) => {
      const repository = repositories.find((r) => r.name === name);
      setCurrentRepository(repository);
      history.push(`/repository/${currentUser.login}/${name}`);
    },
    [repositories, setCurrentRepository, history, currentUser]
  );

  return (
    <Table
      columns={columns}
      data={repositories}
      navigateTo={navigateToRepository}
    />
  );
};
