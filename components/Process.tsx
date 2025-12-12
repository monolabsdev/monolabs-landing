"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const steps = [
  {
    title: "1) Estimate",
    body: "Configure scope in minutes. Transparent pricing ranges so you know what you’re getting into.",
  },
  {
    title: "2) Scope call",
    body: "We confirm requirements, constraints, and success metrics. No vague “we’ll see” stuff.",
  },
  {
    title: "3) Build",
    body: "Weekly updates. Clean implementation. Performance + maintainability from day one.",
  },
  {
    title: "4) Launch + support",
    body: "Deploy, monitor, iterate. Optional monthly support for updates and improvements.",
  },
];

export function Process() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 6,
        py: { xs: 8, md: 14 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 6,
            fontWeight: 100,
            color: "text.primary",
            fontSize: { xs: "2.0rem", md: "2.6rem", lg: "3rem" },
            letterSpacing: "-0.02em",
          }}
        >
          How it works
        </Typography>

        <Grid container spacing={3}>
          {steps.map((s) => (
            <Grid key={s.title} size={{ xs: 12, md: 6 }}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: "1rem",
                  bgcolor: "background.paper",
                  borderColor: "rgba(255,255,255,0.1)",
                  p: 1,
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 250, mb: 1 }}>
                    {s.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontWeight: 200,
                      lineHeight: 1.7,
                    }}
                  >
                    {s.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
