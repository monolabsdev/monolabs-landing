"use client";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface PriceTickerProps {
  value: number;
  duration?: number;
  sx?: SxProps<Theme>;
}

export function PriceTicker({ value, duration = 600, sx }: PriceTickerProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayValue === value) return;

    setIsAnimating(true);
    const startValue = displayValue;
    const difference = value - startValue;
    const startTime = Date.now();

    const animateFrame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + difference * easeOutCubic);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      } else {
        setDisplayValue(value);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animateFrame);
  }, [value, displayValue, duration]);

  return (
    <Typography
      sx={{
        ...sx,
        transition: isAnimating ? "none" : "all 0.2s ease",
      }}
    >
      £{displayValue.toLocaleString()}
    </Typography>
  );
}
