import React from "react";
import { Flex } from "@primer/components";

import UsersTable from "components/views/UsersTable";

export default ({ users }) => {
  return (
    <Flex p={4} mt={2} justifyContent="center">
      <UsersTable users={users} />
    </Flex>
  );
};
