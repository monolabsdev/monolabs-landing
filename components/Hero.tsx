"use client";

import { Box, Typography, Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimationProvider";

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
        color: "white",
        overflow: "hidden",
      }}
    >
      <StaggerContainer>
        <StaggerItem>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 100,
              fontSize: { xs: "3.75rem", md: "4.5rem", lg: "6rem" },
              lineHeight: 1.1,
            }}
          >
            Simplicity,
            <Box
              component="span"
              sx={{ fontStyle: "italic", display: "block" }}
            >
              Engineered.
            </Box>
          </Typography>
        </StaggerItem>

        <StaggerItem>
          <FadeIn delay={0.3} direction="up">
            <Typography
              variant="body1"
              sx={{
                fontWeight: 200,
                fontSize: { xs: "1rem", md: "1.125rem" },
                maxWidth: "32rem",
                lineHeight: 1.6,
                mt: 3,
                opacity: 0.8,
                mx: "auto",
              }}
            >
              Mono builds systems and experiences that merge form with function—
              clear, precise, and purpose-driven.
            </Typography>
          </FadeIn>
        </StaggerItem>

        <StaggerItem>
          <FadeIn delay={0.5} direction="up">
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
          </FadeIn>
        </StaggerItem>
      </StaggerContainer>
    </Box>
  );
};
