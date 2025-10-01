export const floatText = {
  display: "inline-block",
  position: "absolute",
  top: "-10px",
  left: "7px",
  zIndex: "50",
  backgroundColor: "transparent",
  color: "#000",
  fontSize: "12px",
  backdropFilter: "blur(5px)",
  borderRadius: "0.5rem",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  paddingInline: "0.5rem",
};

export const labelStyle = {
  fontSize: "1rem",
  fontWeight: "bold",
};

export const inputStyle = {
  fontSize: { base: "0.875rem", md: "1rem" },
  paddingLeft: "0.5rem",
};

// ReactSelectStyles.ts
import type { StylesConfig } from "react-select";

export const customReactSelectStyles: StylesConfig<ReactSelectOptionType, false> = {
  container: (base) => ({
    ...base,
    width: "100%",
    height: "100%",
  }),
  control: (base, state) => ({
    ...base,
    height: "100%",
    minHeight: "38px",
    borderColor: state.isFocused ? "#a1a1aa" : "#e4e4e7",
    backgroundColor: "#fafafa",
    boxShadow: state.isFocused ? "0 0 0 1px #a1a1aa" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#a1a1aa" : "#e4e4e7",
    },
  }),
  menuList: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  option: (base) => ({
    ...base,
    outline: "none",
    boxShadow: "none",
  }),
};
