import React, { useMemo, useCallback } from "react";

import Table from "components/common/Table";
import { useHistory } from "react-router-dom";

export default ({ repositories }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        sortType: "basic",
      },
      {
        Header: "Description",
        accessor: "description",
        sortType: "basic",
      },
    ],
    []
  );

  const history = useHistory();
  const navigateToRepository = useCallback(
    ({ name }) => {
      history.push(`/repository/:name`);
    },
    [history]
  );

  return (
    <Table
      columns={columns}
      data={repositories}
      navigateTo={navigateToRepository}
    />
  );
};
