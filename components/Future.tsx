"use client";

import { Box, Container, Typography } from "@mui/material";
import { ParallaxText } from "./AnimationProvider";

export function Future() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 6,
        py: { xs: 8, md: 16, lg: 32 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          {/* Icon/Logo */}
          <Box
            sx={{
              mb: 12,
              opacity: 0.4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 96,
                height: 96,
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
            </Box>
          </Box>

          <ParallaxText speed={0.3}>
            {/* Heading */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.25rem", md: "3.75rem" },
                fontWeight: 100,
                mb: 8,
                letterSpacing: "-0.02em",
                color: "text.primary",
              }}
            >
              The Future
            </Typography>

            {/* Description */}
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.5rem", md: "1.875rem" },
                fontWeight: 100,
                lineHeight: 1.6,
                color: "text.secondary",
              }}
            >
              Soon, Wovio will extend beyond the digital — into the objects you
              touch every day.
            </Typography>
          </ParallaxText>
        </Box>
      </Container>
    </Box>
  );
}
