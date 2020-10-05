import React from "react";
import { TextInput } from "@primer/components";
import { SearchIcon } from "@primer/octicons-react";

export default ({ onChange }) => (
  <TextInput
    onChange={(event) => {
      event.persist();
      onChange(event);
    }}
    ml={4}
    icon={SearchIcon}
    aria-label="organization"
    name="organization"
    placeholder="Find an organization"
  />
);
