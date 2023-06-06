import { createTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { LinkProps } from "@mui/material/Link";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fafafa",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: NavLink,
      } as LinkProps,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1f1f1f",
    },
  },
});
