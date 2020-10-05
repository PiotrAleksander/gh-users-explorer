import React from "react";
import { NavLink } from "react-router-dom";
import { SubNav } from "@primer/components";

import "./NavbarView.css";

export default ({ history }) => (
  <SubNav aria-label="Main">
    <SubNav.Links>
      <SubNav.Link to="/" as={NavLink}>
        Home
      </SubNav.Link>
      <SubNav.Link className="Navbar-link" onClick={history.goBack}>
        Back
      </SubNav.Link>
    </SubNav.Links>
  </SubNav>
);
