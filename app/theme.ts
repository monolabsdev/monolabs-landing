"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0a0a0a", paper: "#121212" },
    text: { primary: "#ededed", secondary: "#bbbbbb" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: { fontWeight: 100 },
    h2: { fontWeight: 100 },
    body1: { fontWeight: 100 },
    body2: { fontWeight: 100 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "9999px",
          fontWeight: 500,
          textTransform: "none",
          transition: "all 0.2s ease-in-out",
        },
      },
      variants: [
        {
          props: { variant: "contained" }, // Primary button
          style: {
            backgroundColor: "#ededed",
            color: "#0a0a0a",
            "&:hover": { backgroundColor: "#ffffff" },
          },
        },
        {
          props: { variant: "outlined" }, // Secondary / outline button
          style: {
            backgroundColor: "transparent",
            color: "#ededed",
            border: "1px solid rgba(255,255,255,0.15)",
            "&:hover": {
              backgroundColor: "#1a1a1a",
              borderColor: "transparent",
            },
          },
        },
      ],
    },
  },
});

export default theme;
