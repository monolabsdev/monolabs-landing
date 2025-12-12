"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Fade,
  Stack,
} from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";

export function CallToAction() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);

    try {
      const estimate =
        typeof window !== "undefined"
          ? localStorage.getItem("estimatorConfig")
          : null;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: note,
          estimate: estimate ? JSON.parse(estimate) : null,
        }),
      });

      const data: unknown = await res.json();

      if (!res.ok) {
        const errorMessage =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Request failed";

        throw new Error(errorMessage);
      }

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setNote("");

      setTimeout(() => setIsSubmitted(false), 3500);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 6,
        py: { xs: 8, md: 14 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.6rem", md: "3.75rem" },
              fontWeight: 100,
              mb: 3,
              letterSpacing: "-0.02em",
            }}
          >
            Request a quote
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              fontWeight: 200,
              mb: 6,
              color: "text.secondary",
              lineHeight: 1.7,
            }}
          >
            If you’ve used the estimator, we’ll receive your scope
            automatically. If not, that’s fine. Words still work.
          </Typography>

          {isSubmitted ? (
            <Fade in>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 200,
                }}
              >
                Received. We’ll reply with next steps.
              </Typography>
            </Fade>
          ) : (
            <Stack
              component="form"
              onSubmit={handleSubmit}
              spacing={2}
              sx={{ textAlign: "left" }}
            >
              <TextField
                label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ sx: { color: "text.secondary" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    bgcolor: "background.paper",
                  },
                }}
              />

              <TextField
                label="Your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ sx: { color: "text.secondary" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    bgcolor: "background.paper",
                  },
                }}
              />

              <TextField
                label="What are you trying to build?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Example: a 5-page marketing site + CMS + booking form"
                multiline
                minRows={4}
                fullWidth
                InputLabelProps={{ sx: { color: "text.secondary" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    bgcolor: "background.paper",
                  },
                }}
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  endIcon={<KeyboardArrowRight fontSize="small" />}
                  sx={{ px: 3, py: 1.5, minWidth: 220 }}
                >
                  {loading ? "Sending…" : "Send request"}
                </Button>

                <Link href="/estimator" passHref>
                  <Button
                    variant="outlined"
                    sx={{ px: 3, py: 1.5, minWidth: 220 }}
                  >
                    Use the estimator
                  </Button>
                </Link>
              </Stack>
            </Stack>
          )}

          <Box
            sx={{
              mt: 8,
              pt: 5,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: 200,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              © {new Date().getFullYear()} MONOLABS
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
