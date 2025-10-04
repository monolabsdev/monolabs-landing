"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Fade } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide after scrolling 100px
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fade in={isVisible} timeout={500}>
      <Box
        sx={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          pointerEvents: isVisible ? "auto" : "none",
        }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <Typography
          sx={{
            fontSize: "0.875rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.6)",
            textTransform: "uppercase",
            animation: "fadeInOut 2s ease-in-out infinite",
            "@keyframes fadeInOut": {
              "0%, 100%": { opacity: 0.6 },
              "50%": { opacity: 1 },
            },
          }}
        >
          Scroll
        </Typography>
        <KeyboardArrowDown
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "2rem",
            animation: "bounce 2s ease-in-out infinite",
            "@keyframes bounce": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(8px)" },
            },
          }}
        />
      </Box>
    </Fade>
  );
}

// Alternative: Mouse wheel style indicator
export function MouseScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fade in={isVisible} timeout={500}>
      <Box
        sx={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          pointerEvents: "none",
        }}
      >
        {/* Mouse icon */}
        <Box
          sx={{
            width: 28,
            height: 42,
            border: "2px solid rgba(255,255,255,0.4)",
            borderRadius: "14px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            paddingTop: "8px",
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 8,
              bgcolor: "rgba(255,255,255,0.6)",
              borderRadius: "2px",
              animation: "scroll 2s ease-in-out infinite",
              "@keyframes scroll": {
                "0%": { transform: "translateY(0)", opacity: 1 },
                "50%": { transform: "translateY(12px)", opacity: 0.3 },
                "100%": { transform: "translateY(0)", opacity: 1 },
              },
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
          }}
        >
          Scroll to explore
        </Typography>
      </Box>
    </Fade>
  );
}

// Alternative: Minimal line indicator
export function MinimalScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fade in={isVisible} timeout={500}>
      <Box
        sx={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            width: 1,
            height: 60,
            bgcolor: "rgba(255,255,255,0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "30%",
              bgcolor: "rgba(255,255,255,0.8)",
              animation: "lineScroll 2s ease-in-out infinite",
              "@keyframes lineScroll": {
                "0%": { transform: "translateY(0)" },
                "100%": { transform: "translateY(300%)" },
              },
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
}
