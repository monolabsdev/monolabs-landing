"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import {
  calculateTotalPrice,
  getEnabledFeatures,
  EstimatorConfigState,
} from "@/config/estimator-config";
import { BackHomeButton } from "@/components/BackHomeButton";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [estimate, setEstimate] = useState<EstimatorConfigState | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const encoded = searchParams.get("estimate");
    if (!encoded) return;

    try {
      const parsed = JSON.parse(decodeURIComponent(encoded));
      setEstimate(parsed);
    } catch {
      setError("We couldn’t load your estimate. Please try again.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email) {
      setError("Please provide your name and email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          estimate,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const total = estimate ? calculateTotalPrice(estimate) : null;
  const features = estimate ? getEnabledFeatures(estimate) : [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 6, md: 12 },
      }}
    >
      <BackHomeButton />
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.25rem", md: "3rem" },
            fontWeight: 100,
            mb: 2,
            letterSpacing: "-0.02em",
          }}
        >
          Request Full Quote
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 6,
            lineHeight: 1.6,
          }}
        >
          Send your details and we’ll review your estimate and confirm final
          pricing.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 4 }}>
            Request sent successfully. We’ll be in touch shortly.
          </Alert>
        )}

        {/* Estimate Summary */}
        {estimate && (
          <Box
            sx={{
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 2,
              p: 3,
              mb: 6,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                color: "text.secondary",
                mb: 2,
              }}
            >
              YOUR ESTIMATE
            </Typography>

            <Typography sx={{ fontSize: "1rem", mb: 1 }}>
              Pages: {estimate.pages}
            </Typography>

            {features.length > 0 && (
              <Box sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: "1rem" }}>Features:</Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {features.map((f) => (
                    <li key={f.id}>
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        {f.label}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: 100,
              }}
            >
              £{total?.toLocaleString()}
            </Typography>
          </Box>
        )}

        {/* Contact Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Message (optional)"
            fullWidth
            multiline
            minRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 4 }}
          />

          <Button
            variant="contained"
            size="large"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{ py: 1.75, fontSize: "1rem" }}
          >
            {loading ? "Sending…" : "Send Request"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
