import React from "react";
import { Flex } from "@primer/components";

import RepositoriesTable from "components/views/RepositoriesTable";

export default ({ repositories }) => {
  return (
    <Flex p={4} mt={2} justifyContent="center">
      <RepositoriesTable repositories={repositories} />
    </Flex>
  );
};
