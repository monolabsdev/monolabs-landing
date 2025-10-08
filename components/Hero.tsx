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
        bgcolor: "black",
        color: "white",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 100,
            fontSize: { xs: "3.5rem", md: "5rem", lg: "6rem" },
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          Simplicity.
          <Box
            component="span"
            sx={{
              display: "block",
              fontWeight: 400,
              fontStyle: "normal",
              letterSpacing: "-0.03em",
              mt: 1,
            }}
          >
            Engineered.
          </Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 200,
            fontSize: { xs: "1rem", md: "1.125rem" },
            maxWidth: "32rem",
            lineHeight: 1.6,
            mt: 3,
            opacity: 0.8,
          }}
        >
          Mono builds systems and experiences that merge form with
          function—clear, precise, and purpose-driven.
        </Typography>

        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDown fontSize="small" />}
          onClick={scrollToNext}
          sx={{
            mt: 5,
            fontSize: "1.1rem",
            px: 3,
            py: 1,
            minWidth: "160px",
            borderColor: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": {
              borderColor: "white",
              backgroundColor: "rgba(255,255,255,0.05)",
            },
          }}
        >
          Explore Mono
        </Button>
      </motion.div>
    </Box>
  );
};
