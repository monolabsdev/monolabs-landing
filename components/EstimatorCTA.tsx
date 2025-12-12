"use client";

import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";

export function EstimatorCTA() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        px: 6,
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "1.25rem",
            p: { xs: 4, md: 6 },
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 120,
              letterSpacing: "-0.02em",
              mb: 1.5,
            }}
          >
            Get pricing clarity in 2 minutes
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontWeight: 200,
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            Use the estimator to map scope to cost. Then request a quote and
            we’ll confirm everything properly.
          </Typography>

          <Link href="/estimator" passHref>
            <Button
              variant="contained"
              endIcon={<KeyboardArrowRight />}
              sx={{ px: 3.25, py: 1.5 }}
            >
              Open the estimator
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
