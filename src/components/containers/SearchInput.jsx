import React from "react";
import { useSetRecoilState } from "recoil";
import { debounce } from "lodash/fp";

import { currentOrganizationState } from "store/github";
import { SearchInputView } from "components/views";

export default () => {
  const setCurrentOrganization = useSetRecoilState(currentOrganizationState);

  const setOrganization = debounce(1000, (event) => {
    if (event.target.value) setCurrentOrganization(event.target.value);
  });

  return <SearchInputView onChange={setOrganization} />;
};
