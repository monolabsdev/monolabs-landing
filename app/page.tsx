"use client";

import { Hero } from "../components/Hero";
import { Box, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
        sx={{ fontWeight: 100 }}
      >
        <Hero />
      </Box>
      <Box id="about" p={4} sx={{}}>
        <Typography sx={{ textAlign: "center" }} variant="h3">
          Curated Experiences
        </Typography>
        <Stack direction={"row"} spacing={2} mt={2} mx="auto"></Stack>
      </Box>
    </Box>
  );
}
