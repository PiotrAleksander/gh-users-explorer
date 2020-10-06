import React from "react";
import { useSetRecoilState } from "recoil";
import { debounce } from "lodash/fp";
import { useHistory } from "react-router-dom";

import { currentOrganizationState } from "store/github";
import { SearchInputView } from "components/views";

export default () => {
  const history = useHistory();
  const setCurrentOrganization = useSetRecoilState(currentOrganizationState);

  const setOrganization = debounce(1500, (event) => {
    const {
      target: { value },
    } = event;
    if (value) {
      history.push(`/${value}`);
      setCurrentOrganization(value);
    }
  });

  return <SearchInputView onChange={setOrganization} />;
};
