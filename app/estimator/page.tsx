"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Slider,
  FormControlLabel,
  Switch,
  Button,
  FormControl,
  FormLabel,
} from "@mui/material";
import { PriceTicker } from "@/components/price-ticker";
import {
  estimatorConfig,
  calculateTotalPrice,
  getDefaultConfig,
  EstimatorConfigState,
} from "@/config/estimator-config";

import { BackHomeButton } from "@/components/BackHomeButton";

export default function CalculatorPage() {
  const router = useRouter();
  const [config, setConfig] = useState<EstimatorConfigState>(
    getDefaultConfig() as EstimatorConfigState,
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const handleGetEstimate = () => {
    // Save to localStorage
    localStorage.setItem("estimatorConfig", JSON.stringify(config));

    // Navigate with URL params as backup
    const params = new URLSearchParams();
    Object.entries(config).forEach(([key, value]) => {
      params.set(key, value.toString());
    });

    router.push(`/estimate?${params.toString()}`);
  };

  // Load cached configuration on mount
  useEffect(() => {
    const cached = localStorage.getItem("estimatorConfig");
    if (cached) {
      try {
        const parsedConfig = JSON.parse(cached);
        setConfig(parsedConfig);
      } catch (e) {
        console.error("Failed to load cached configuration", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save configuration to localStorage whenever it changes (only after initial load)
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("estimatorConfig", JSON.stringify(config));
  }, [config, isLoaded]);

  const updateConfig = (key: string, value: boolean | number) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 6, md: 12 },
      }}
    >
      <BackHomeButton />
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 100,
              mb: 2,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Website Estimate
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.125rem" },
              maxWidth: "500px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Configure your project to receive an instant estimate
          </Typography>
        </Box>

        {/* Calculator Form */}
        <Box sx={{ maxWidth: "600px", mx: "auto" }}>
          {/* Number of Pages Slider */}
          <Box sx={{ mb: 8 }}>
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  color: "text.primary",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  mb: 4,
                }}
              >
                NUMBER OF PAGES
              </FormLabel>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={config.pages as number}
                  onChange={(_, value) =>
                    updateConfig("pages", value as number)
                  }
                  min={estimatorConfig.pricePerPage.min}
                  max={estimatorConfig.pricePerPage.max}
                  marks={[
                    { value: 1, label: "1" },
                    { value: 5, label: "5" },
                    { value: 10, label: "10" },
                    { value: 15, label: "15" },
                    { value: 20, label: "20" },
                  ]}
                  valueLabelDisplay="on"
                  sx={{
                    color: "text.primary",
                    "& .MuiSlider-thumb": {
                      width: 20,
                      height: 20,
                      bgcolor: "text.primary",
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: "0 0 0 8px rgba(255,255,255,0.1)",
                      },
                    },
                    "& .MuiSlider-track": {
                      bgcolor: "text.primary",
                      border: "none",
                    },
                    "& .MuiSlider-rail": {
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                    "& .MuiSlider-mark": {
                      bgcolor: "rgba(255,255,255,0.2)",
                    },
                    "& .MuiSlider-markLabel": {
                      color: "text.secondary",
                      fontSize: "0.75rem",
                      fontWeight: 100,
                    },
                    "& .MuiSlider-valueLabel": {
                      bgcolor: "text.primary",
                      color: "background.default",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    },
                  }}
                />
              </Box>
            </FormControl>
          </Box>

          {/* Features */}
          <Box sx={{ mb: 8 }}>
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                mb: 4,
              }}
            >
              FEATURES
            </Typography>
            <Box sx={{ "& > *": { mb: 3 } }}>
              {estimatorConfig.features.map((feature) => (
                <FormControlLabel
                  key={feature.id}
                  control={
                    <Switch
                      checked={config[feature.id] as boolean}
                      onChange={(e) =>
                        updateConfig(feature.id, e.target.checked)
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "text.primary",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            bgcolor: "rgba(255,255,255,0.3)",
                          },
                      }}
                    />
                  }
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        ml: 2,
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: "1rem", fontWeight: 100 }}>
                          {feature.label}
                        </Typography>
                        {feature.description && (
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              color: "text.secondary",
                              mt: 0.5,
                            }}
                          >
                            {feature.description}
                          </Typography>
                        )}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 100,
                          color: "text.secondary",
                          ml: 2,
                          flexShrink: 0,
                        }}
                      >
                        {feature.alwaysIncluded
                          ? "Included"
                          : `+£${feature.price}`}
                      </Typography>
                    </Box>
                  }
                  sx={{ width: "100%", ml: 0, mr: 0, alignItems: "flex-start" }}
                />
              ))}
            </Box>
          </Box>

          {/* Maintenance */}
          <Box sx={{ mb: 10 }}>
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                mb: 4,
              }}
            >
              ONGOING SUPPORT
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={config.maintenance as boolean}
                  onChange={(e) =>
                    updateConfig("maintenance", e.target.checked)
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "text.primary",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      bgcolor: "rgba(255,255,255,0.3)",
                    },
                  }}
                />
              }
              label={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    ml: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "1rem", fontWeight: 100 }}>
                    Monthly maintenance
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 100,
                      color: "text.secondary",
                    }}
                  >
                    £{estimatorConfig.maintenance.price} / month
                  </Typography>
                </Box>
              }
              sx={{ width: "100%", ml: 0, mr: 0 }}
            />
          </Box>

          {/* Estimated Total */}
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              px: 4,
              mb: 6,
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                mb: 2,
              }}
            >
              ESTIMATED TOTAL
            </Typography>
            <PriceTicker
              value={calculateTotalPrice(config)}
              duration={600}
              sx={{
                fontSize: { xs: "3rem", md: "4rem" },
                fontWeight: 100,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            />
            {config.maintenance && (
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.875rem",
                  mt: 2,
                }}
              >
                +£{estimatorConfig.maintenance.price} / month
              </Typography>
            )}
          </Box>

          {/* CTA */}
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleGetEstimate}
              sx={{
                px: 8,
                py: 2,
                fontSize: "1rem",
                mb: 2,
              }}
            >
              Get Detailed Estimate
            </Button>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                lineHeight: 1.5,
              }}
            >
              See the full breakdown of your project
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
