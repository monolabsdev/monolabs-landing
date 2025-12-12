"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";

const services = [
  {
    title: "Marketing Websites",
    description:
      "Fast, crisp, conversion-focused sites with modern performance and clean CMS editing.",
    chips: ["Next.js", "SEO", "Analytics", "CMS"],
  },
  {
    title: "Web Apps & Dashboards",
    description:
      "Auth, data views, dashboards, admin panels, and product flows built for scale.",
    chips: ["Auth", "DB", "APIs", "Stripe-ready"],
  },
  {
    title: "Design → Build",
    description:
      "UI implementation that actually matches the design. No “close enough” handoffs.",
    chips: ["Design systems", "Responsive", "Polish"],
  },
];

export function Products() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 6,
        py: { xs: 8, md: 16, lg: 26 },
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <motion.div style={{ zIndex: 1, width: "100%" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: { xs: 6, md: 10 },
              fontWeight: 100,
              color: "text.primary",
              fontSize: { xs: "2.1rem", md: "2.9rem", lg: "3.25rem" },
              letterSpacing: "-0.02em",
            }}
          >
            What we build
          </Typography>

          <Typography
            align="center"
            sx={{
              maxWidth: "52rem",
              mx: "auto",
              mb: { xs: 6, md: 10 },
              color: "text.secondary",
              fontWeight: 200,
              lineHeight: 1.7,
              opacity: 0.9,
            }}
          >
            Product-first websites and web apps for startups and small teams who
            want speed, clarity, and a build that doesn’t fall apart after month
            two.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {services.map((s, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={s.title}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: "1rem",
                      height: "100%",
                      bgcolor: "background.paper",
                      borderColor: "rgba(255,255,255,0.1)",
                      p: 3,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.25)",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 250, mb: 1, color: "text.primary" }}
                      >
                        {s.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.65,
                          mb: 2,
                        }}
                      >
                        {s.description}
                      </Typography>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {s.chips.map((c) => (
                          <Chip
                            key={c}
                            label={c}
                            variant="outlined"
                            sx={{
                              borderColor: "rgba(255,255,255,0.15)",
                              color: "text.secondary",
                              fontWeight: 200,
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </motion.div>
    </Box>
  );
}
