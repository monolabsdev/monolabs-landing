// components/EstimateSkeleton.tsx
"use client";

import { Box, Container, Skeleton } from "@mui/material";

export function EstimateSkeleton() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 6, md: 12 },
      }}
    >
      <Container maxWidth="md">
        <Skeleton height={80} width="60%" sx={{ mb: 2 }} />
        <Skeleton height={24} width="80%" sx={{ mb: 8 }} />

        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} height={56} sx={{ mb: 2 }} />
        ))}

        <Skeleton height={120} sx={{ mt: 8 }} />
      </Container>
    </Box>
  );
}
