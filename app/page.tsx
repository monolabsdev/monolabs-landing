"use client";

import { Stack } from "@mui/material";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Products } from "@/components/Products";
import { FadeIn, ScaleOnScroll } from "@/components/AnimationProvider";
import { Future } from "@/components/Future";
import { CallToAction } from "@/components/CallToAction";
import { ScrollIndicator } from "@/components/ScrollIndicator";

export default function Home() {
  return (
    <>
      <meta
        name="google-site-verification"
        content="00tJU0St__ZYIm1X1eljrVi2yo6OTnjz0KXIczQXmos"
      />
      <Stack
        component="main"
        direction="column"
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          fontWeight: 100,
          overflowX: "hidden",
        }}
      >
        <ScrollIndicator />
        <FadeIn delay={0.2} direction="up">
          <Hero />
        </FadeIn>
        <Philosophy />
        <ScaleOnScroll scaleStart={0.8} scaleEnd={1}>
          <Products />
        </ScaleOnScroll>
        <Future />
        <CallToAction />
      </Stack>
    </>
  );
}
