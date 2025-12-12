"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import Link from "next/link";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimationProvider";

export const Hero: React.FC = () => {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
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
              fontSize: { xs: "3.2rem", md: "4.25rem", lg: "5.5rem" },
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            Minimal websites.
            <Box
              component="span"
              sx={{ fontStyle: "italic", display: "block" }}
            >
              Built like products.
            </Box>
          </Typography>
        </StaggerItem>

        <StaggerItem>
          <FadeIn delay={0.25} direction="up">
            <Typography
              variant="body1"
              sx={{
                fontWeight: 200,
                fontSize: { xs: "1rem", md: "1.125rem" },
                maxWidth: "42rem",
                lineHeight: 1.7,
                mt: 3,
                opacity: 0.78,
                mx: "auto",
              }}
            >
              Monolabs designs and builds high-quality web platforms for
              founders and growing teams. Clear scope, transparent estimates,
              and fast delivery. No mystery invoices. No agency theater.
            </Typography>
          </FadeIn>
        </StaggerItem>

        <StaggerItem>
          <FadeIn delay={0.45} direction="up">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 4, justifyContent: "center", alignItems: "center" }}
            >
              <Link href="/estimator" passHref>
                <Button
                  variant="contained"
                  sx={{ px: 3.25, py: 1.1, fontSize: "1.05rem", minWidth: 200 }}
                >
                  Get an instant estimate
                </Button>
              </Link>

              <Button
                variant="outlined"
                endIcon={<KeyboardArrowDown fontSize="small" />}
                onClick={scrollToNext}
                sx={{ px: 3, py: 1.1, fontSize: "1.05rem", minWidth: 200 }}
              >
                How we work
              </Button>
            </Stack>
          </FadeIn>
        </StaggerItem>
      </StaggerContainer>
    </Box>
  );
};
