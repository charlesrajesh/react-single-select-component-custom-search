import React from "react";

import { useMultiSelect } from "../hooks/use-multi-select";

export const DropdownHeader = () => {
  const { t, value, options, valueRenderer } = useMultiSelect();

  const noneSelected = value === null;
  const customText = valueRenderer && valueRenderer(value, options);

  const getSelectedText = () => value?.value;

  return noneSelected ? (
    <span className="gray">{customText || t("selectSomeItems")}</span>
  ) : (
    <span>
      {customText ||
        (getSelectedText())}
    </span>
  );
};
