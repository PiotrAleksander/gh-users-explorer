import React from "react";
import { NavLink } from "react-router-dom";
import { SubNav } from "@primer/components";

export default ({ history }) => (
  <SubNav m={2} p={4} aria-label="Main">
    <SubNav.Links>
      <SubNav.Link to="/" as={NavLink}>
        Home
      </SubNav.Link>
      <SubNav.Link onClick={history.goBack}>Back</SubNav.Link>
    </SubNav.Links>
  </SubNav>
);
