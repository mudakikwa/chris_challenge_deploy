import { createTheme } from "@mui/material/styles";

const xxsh = "425px";
const xls = "600px";
const xlg = "1440px";
const lg = "1200px";
const md = "768px";

const mq = (size, styles) => {
  return {
    [`@media (max-width: ${size})`]: styles,
  };
};

const Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#D0D3DB",
    },
    error: {
      main: "#AB4E68  !important",
    },
    warning: {
      main: "#ffe4c4  !important",
    },
    success: {
      main: "rgba(4, 140, 212, 1) !important",
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: "poppins",
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          ...mq(xlg, {
            fontSize: "0.875rem",
          }),
          ...mq(lg, {
            fontSize: "0.8125rem",
          }),
          ...mq(md, {
            fontSize: "0.75rem",
          }),
          ...mq(xls, {
            fontSize: "0.625rem",
          }),
          ...mq(xxsh, {
            width: "100%",
          }),
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          ...mq(xls, {
            width: "100%",
            "MuiInputBase-root": {
              width: "100%",
            },
          }),
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
        },
      },
    },
  },
});

export default Theme;
