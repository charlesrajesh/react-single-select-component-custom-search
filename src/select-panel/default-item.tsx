import React from "react";

import { Option } from "../lib/interfaces";

interface IDefaultItemRendererProps {
  option: Option;
  disabled?: boolean;
  onClick;
}

const DefaultItemRenderer = ({
  option,
  onClick,
  disabled,
}: IDefaultItemRendererProps) => (
  <div className={`item-renderer ${disabled ? "disabled" : ""}`}>
    <span onClick={onClick}>{option.label}</span>
  </div>
);

export default DefaultItemRenderer;
