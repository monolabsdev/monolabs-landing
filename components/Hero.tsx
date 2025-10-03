"use client";

import React from "react";
import { Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const Hero: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="2rem"
      maxWidth="48rem"
      textAlign="center"
      padding="1rem"
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 100,
          fontSize: { xs: "3.75rem", md: "4.5rem", lg: "6rem" },
          lineHeight: 1.1,
        }}
      >
        Simplicity,
        <Box component="span" sx={{ fontStyle: "italic" }}>
          <br />
          Woven.
        </Box>
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontWeight: 100,
          fontSize: { xs: "1rem", md: "1.125rem" },
          maxWidth: "32rem",
          lineHeight: 1.5,
          mt: "1rem",
        }}
      >
        Loom creates digital and physical experiences designed to reduce clutter
        and bring focus.
      </Typography>

      <Button
        variant="outlined"
        endIcon={<KeyboardArrowDown fontSize="small" />}
        sx={{
          mt: "1rem",
          fontSize: "1.25rem",
          padding: "0.5rem 1.5rem",
          minWidth: "150px",
        }}
      >
        Discover Loom
      </Button>
    </Box>
  );
};
