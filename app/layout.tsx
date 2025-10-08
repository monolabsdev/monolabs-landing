import type { Metadata } from "next";
import ClientWrapper from "./ClientWrapper"; // we'll create this
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Monolabs | Do less beautifully.",
  description: "Do less beautifully.",
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
          <ClientWrapper>{children}</ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
