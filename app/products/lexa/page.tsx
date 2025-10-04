"use client";

import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutLexa() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 4, md: 6 },
        py: { xs: 8, md: 16 },
        bgcolor: "background.default",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: "650px", textAlign: "center" }}
      >
        {/* Subtle Coming Soon */}
        <Chip
          label="Coming Soon"
          variant="outlined"
          sx={{
            mb: 2,
            fontSize: "0.75rem",
            fontWeight: 100,
            letterSpacing: 0.5,
            px: 1.5,
            py: 0.5,
            borderColor: "rgba(255,255,255,0.15)",
            color: "text.secondary",
          }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: 100,
            mb: 4,
            color: "text.primary",
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          About{" "}
          <Box component="span" sx={{ fontWeight: 300 }}>
            Lexa
          </Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
            mb: 6,
            fontSize: { xs: "1rem", md: "1.125rem" },
          }}
        >
          Lexa is a minimalist vocabulary learning app designed to help you
          focus on the words that matter most. No distractions, no clutter —
          just efficient, bite-sized learning that fits into your day.
          <br />
          <br />
          Build a strong vocabulary while spending less time memorizing and more
          time using what you learn.
        </Typography>

        <Stack spacing={2} direction="row" justifyContent="center">
          {/* <Link href="/">
            <Button variant="contained">Get Started</Button>
          </Link> */}

          <Link href="/">
            <Button variant="outlined">Back to Loom</Button>
          </Link>
        </Stack>
      </motion.div>
    </Box>
  );
}
