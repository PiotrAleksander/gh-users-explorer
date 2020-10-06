import React from "react";
import { useSetRecoilState } from "recoil";
import { debounce } from "lodash/fp";
import { useLocation } from "react-router-dom";

import { currentOrganizationState } from "store/github";
import { SearchInputView } from "components/views";

export default () => {
  const location = useLocation();
  const setCurrentOrganization = useSetRecoilState(currentOrganizationState);

  const setOrganization = debounce(1000, (event) => {
    if (event.target.value) setCurrentOrganization(event.target.value);
  });

  return location.pathname === "/" ? (
    <SearchInputView onChange={setOrganization} />
  ) : null;
};
