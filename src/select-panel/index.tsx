/**
 * This component represents the entire panel which gets dropped down when the
 * user selects the component.  It encapsulates the search filter, the
 * Select-all item, and the list of options.
 */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useMultiSelect } from "../hooks/use-multi-select";
import { KEY } from "../lib/constants";
import { debounce } from "../lib/debounce";
import { filterOptions } from "../lib/simple-match-utils";
import { Cross } from "./cross";
import SelectItem from "./select-item";
import SelectList from "./select-list";
import { Loading } from "../multi-select/loading";

enum FocusType {
  SEARCH = 0,
  NONE = -1,
}

const SelectPanel = ({ setExpanded }) => {
  const {
    t,
    onChange,
    options,
    filterOptions: customFilterOptions,
    disableSearch,
    hasSelectAll,
    ClearIcon,
    debounceDuration,
    selectPanelLabel,
    onSearch,
    onBlurSelectPanel,
  } = useMultiSelect();

  const listRef = useRef<any>();
  const searchInputRef = useRef<any>();
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [focusIndex, setFocusIndex] = useState(0);

  const skipIndex = useMemo(() => {
    let start = 0;

    if (!disableSearch) start += 1; // if search is enabled then +1 to skipIndex
    if (hasSelectAll) start += 1; // if select-all is enabled then +1 to skipIndex

    return start;
  }, [disableSearch, hasSelectAll]);


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setFocusIndex(FocusType.SEARCH);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setSearchText("");
    searchInputRef?.current?.focus();
  };

  const handleItemClicked = (option, index: number) => {
    setFocusIndex(index);
    onChange(option);
    setExpanded(false);
    onBlurSelectPanel();
  };

  const handleSearchFocus = () => {
    setFocusIndex(FocusType.SEARCH);
  };

  useEffect(() => {
    listRef?.current?.querySelector(`[tabIndex='${focusIndex}']`)?.focus();
  }, [focusIndex]);

  useEffect(() => {
    setFilteredOptions(options)
  }, [options]);

  return (
    <>
      <div className="dropdown-content" onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
        <div className="panel-content">
          <div className="select-panel" role="listbox" ref={listRef}>
            {selectPanelLabel && (<div className="select-panel-label">{selectPanelLabel}</div>)}
            {!disableSearch && (
              <div className="search">
                <input
                  placeholder={t("search")}
                  type="text"
                  aria-describedby={t("search")}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  value={searchText}
                  ref={searchInputRef}
                  tabIndex={0}
                />
                <button
                  type="button"
                  className="search-clear-button"
                  hidden={!searchText}
                  onClick={handleClear}
                  aria-label={t("clearSearch")}
                >
                  {ClearIcon || <Cross />}
                </button>
              </div>
            )}

            <ul className="options">
              {
                filteredOptions.length ? (<SelectList
                  skipIndex={skipIndex}
                  options={filteredOptions}
                  onClick={(option, index) => { handleItemClicked(option, index) }}
                />) : (
                  <li className="no-options">{t("noOptions")}</li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectPanel;
