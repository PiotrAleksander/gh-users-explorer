import { NavbarView } from "components/views";
import React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();

  return <NavbarView history={history} />;
};
