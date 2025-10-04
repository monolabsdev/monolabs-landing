import type { Metadata } from "next";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Wovio - Simplicity, Woven.",
  description: "Wovio - Simplicity, Woven",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
