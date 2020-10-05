import NavbarView from "components/views/NavbarView";
import React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();

  return <NavbarView history={history} />;
};
