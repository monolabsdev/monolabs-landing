"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Fade,
} from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";

export function CallToAction() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        alert(data.error || "Something went wrong");
        return;
      }

      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again!");
    }
  };

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
          {/* Heading */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "3rem", md: "4.5rem" },
              fontWeight: 100,
              mb: 8,
              letterSpacing: "-0.02em",
              color: "text.primary",
            }}
          >
            Stay in the Loop
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              fontWeight: 100,
              mb: 12,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Join the waitlist to be notified when we launch new experiences
          </Typography>

          {/* Form or Success Message */}
          {isSubmitted ? (
            <Fade in={isSubmitted}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 100,
                  color: "text.primary",
                }}
              >
                Thank you for joining.
              </Typography>
            </Fade>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                maxWidth: "xl",
                mx: "auto",
              }}
            >
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                fullWidth
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9999px",
                    bgcolor: "background.paper",
                    color: "text.primary",
                    fontWeight: 100,
                    height: "52px",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.15)",
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "text.primary",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "0 1rem",
                      height: "100%",
                      boxSizing: "border-box",
                      "&::placeholder": {
                        color: "rgba(255,255,255,0.4)",
                        opacity: 1,
                      },
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                endIcon={<KeyboardArrowRight fontSize="small" />}
                sx={{
                  fontSize: "1.25rem",
                  px: 3,
                  py: 1,
                  minWidth: "150px",
                }}
              >
                Discover Loom
              </Button>
            </Box>
          )}

          {/* Footer */}
          <Box
            sx={{
              mt: 32,
              pt: 16,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 100,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              © 2025 LOOM. ALL RIGHTS RESERVED.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
