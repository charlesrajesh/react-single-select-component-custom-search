/**
 * This component represents an unadorned list of SelectItem (s).
 */
import React from "react";

import { useMultiSelect } from "../hooks/use-multi-select";
import { Option } from "../lib/interfaces";
import SelectItem from "./select-item";

interface ISelectListProps {
  options: Option[];
  onClick;
  skipIndex: number;
}

const SelectList = ({ options, onClick, skipIndex }: ISelectListProps) => {
  const { disabled, value, ItemRenderer } = useMultiSelect();
  return (
    <>
      {options.map((o: any, i) => {
        const tabIndex = i + skipIndex;

        return (
          <li key={o?.key || i}>
            <SelectItem
              tabIndex={tabIndex}
              option={o}
              checked={value?.value === o.value}
              onClick={(e) => { onClick(o, tabIndex) }}
              itemRenderer={ItemRenderer}
              disabled={o.disabled || disabled}
            />
          </li>
        );
      })}
    </>
  );
};

export default SelectList;
