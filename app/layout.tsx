import type { Metadata } from "next";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loom - Simplicity, Woven.",
  description: "Loom - Simplicity, Woven",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
