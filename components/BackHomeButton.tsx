"use client";

import { IconButton, Box } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useRouter } from "next/navigation";

export function BackHomeButton() {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: "fixed",
        top: { xs: 16, md: 24 },
        left: { xs: 16, md: 24 },
        zIndex: 1300,
      }}
    >
      <IconButton
        onClick={() => router.push("/")}
        sx={{
          bgcolor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(6px)",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.12)",
          },
        }}
      >
        <HomeRoundedIcon />
      </IconButton>
    </Box>
  );
}
