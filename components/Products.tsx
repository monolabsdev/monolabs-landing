"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    name: "Lexa",
    description:
      "A minimalist vocabulary builder that helps you learn and retain new words.",
    link: "/products/lexa", // Add your actual routes here
    disabled: false,
  },
  {
    name: "Clarity",
    description:
      "A note-taking app with zero distractions — just your thoughts, beautifully presented.",
    link: "/products/clarity",
    disabled: true,
  },
  {
    name: "Breathe",
    description:
      "A guided breathing tool for reclaiming quiet moments during busy days.",
    link: "/products/breathe",
    disabled: true,
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
        py: { xs: 8, md: 16, lg: 32 },
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
              mb: { xs: 8, md: 12 },
              fontWeight: 100,
              color: "text.primary",
              fontSize: { xs: "2.25rem", md: "3rem", lg: "3.5rem" },
            }}
          >
            Products that help you do less,
            <Box component="span" sx={{ color: "text.primary" }}>
              {" "}
              beautifully.
            </Box>
          </Typography>

          <Grid container spacing={6} justifyContent="center">
            {products.map((product, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={product.name}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
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
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.3)",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 300,
                          mb: 1,
                          color: "text.primary",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.6,
                        }}
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                    <Box textAlign="center">
                      {product.disabled ? (
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 2 }}
                          disabled
                        >
                          Learn More
                        </Button>
                      ) : (
                        <Link href={product.link} passHref>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                          >
                            Learn More
                          </Button>
                        </Link>
                      )}
                    </Box>
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
