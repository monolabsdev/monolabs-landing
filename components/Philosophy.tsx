"use client";

import { Box, Container, Typography } from "@mui/material";
import { ParallaxText } from "./AnimationProvider";

export function Philosophy() {
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
        overflow: "hidden",
      }}
    >
      <ParallaxText speed={0.3}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              lineHeight: 1.6,
              fontSize: { xs: "1.875rem", md: "3rem", lg: "3.75rem" },
              fontWeight: 100,
            }}
          >
            We believe in fewer notifications, fewer distractions, fewer things
            fighting for your attention.{" "}
            <Box component="span" sx={{ color: "text.primary" }}>
              Just the essentials, designed beautifully.
            </Box>
          </Typography>
        </Container>
      </ParallaxText>
    </Box>
  );
}
