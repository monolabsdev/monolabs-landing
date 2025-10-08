"use client";

import { Box, Typography, Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      <motion.div>
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
            mt: 3,
          }}
        >
          Mono creates digital and physical experiences designed to reduce
          clutter and bring focus.
        </Typography>

        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDown fontSize="small" />}
          onClick={scrollToNext}
          sx={{
            mt: 4,
            fontSize: "1.25rem",
            px: 3,
            py: 1,
            minWidth: "150px",
          }}
        >
          Discover Mono
        </Button>
      </motion.div>
    </Box>
  );
};