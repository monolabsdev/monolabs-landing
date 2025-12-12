"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";
import {
  estimatorConfig,
  getDefaultConfig,
  getEnabledFeatures,
  getEnabledIncludedItems,
} from "@/config/estimator-config";
import { EstimateSkeleton } from "@/components/EstimateSkeleton";
import { BackHomeButton } from "@/components/BackHomeButton";

function EstimateContent() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<Record<string, boolean | number> | null>(
    null,
  );

  useEffect(() => {
    // Try to load from localStorage first
    const cached = localStorage.getItem("estimatorConfig");
    let loadedConfig: Record<string, boolean | number> | null = null;

    if (cached) {
      try {
        loadedConfig = JSON.parse(cached);
      } catch (e) {
        console.error("Failed to load cached configuration", e);
      }
    }

    // Fall back to URL params if no localStorage data
    if (!loadedConfig) {
      loadedConfig = getDefaultConfig();
      // Override with URL params
      searchParams.forEach((value, key) => {
        if (key === "pages") {
          loadedConfig![key] = Number.parseInt(value);
        } else {
          loadedConfig![key] = value === "true";
        }
      });
    }

    setConfig(loadedConfig);
  }, [searchParams]);

  if (!config) {
    return <EstimateSkeleton />;
  }

  const pages = config.pages as number;
  const enabledFeatures = getEnabledFeatures(config);
  const enabledIncludedItems = getEnabledIncludedItems(config);

  // Calculate pricing
  const pricing = {
    baseBuild: estimatorConfig.basePrice,
    pages: {
      count: pages,
      pricePerPage: estimatorConfig.pricePerPage.amount,
      total: pages * estimatorConfig.pricePerPage.amount,
    },
    features: enabledFeatures
      .filter((f) => !f.alwaysIncluded)
      .map((f) => ({
        label: f.label,
        price: f.price,
      })),
  };

  const total =
    pricing.baseBuild +
    pricing.pages.total +
    pricing.features.reduce((sum, f) => sum + f.price, 0);

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
        {/* Title Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 100,
              mb: 2,
              letterSpacing: "-0.02em",
            }}
          >
            Your Website Estimate
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.125rem" },
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            A transparent breakdown of your project. Final pricing confirmed
            after a quick chat.
          </Typography>
        </Box>

        {/* Project Overview */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              mb: 3,
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
            }}
          >
            PROJECT OVERVIEW
          </Typography>
          <Box sx={{ "& > *": { mb: 2 } }}>
            <Box>
              <Typography
                sx={{ color: "text.secondary", fontSize: "0.875rem", mb: 0.5 }}
              >
                Project type
              </Typography>
              <Typography sx={{ fontSize: "1rem" }}>
                Custom minimalist website
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ color: "text.secondary", fontSize: "0.875rem", mb: 0.5 }}
              >
                Pages
              </Typography>
              <Typography sx={{ fontSize: "1rem" }}>{pages} pages</Typography>
            </Box>
            {enabledFeatures.length > 0 && (
              <Box>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    mb: 0.5,
                  }}
                >
                  Features included
                </Typography>
                <Box component="ul" sx={{ listStyle: "none", pl: 0, m: 0 }}>
                  {enabledFeatures.map((feature) => (
                    <Typography
                      key={feature.id}
                      component="li"
                      sx={{ fontSize: "1rem", mb: 0.5 }}
                    >
                      • {feature.label}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 8, borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Price Breakdown */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              mb: 4,
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
            }}
          >
            PRICE BREAKDOWN
          </Typography>
          <Box sx={{ "& > *": { mb: 2.5 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "1rem" }}>Base build</Typography>
              <Typography sx={{ fontSize: "1rem" }}>
                £{pricing.baseBuild}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "1rem" }}>
                Pages ({pricing.pages.count} × £{pricing.pages.pricePerPage})
              </Typography>
              <Typography sx={{ fontSize: "1rem" }}>
                £{pricing.pages.total}
              </Typography>
            </Box>
            {pricing.features.map((feature) => (
              <Box
                key={feature.label}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontSize: "1rem" }}>
                  {feature.label}
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>
                  £{feature.price}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.15)" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "1rem", fontWeight: 400 }}>
              Estimated total
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "2.5rem", md: "3rem" },
                fontWeight: 100,
                letterSpacing: "-0.02em",
              }}
            >
              £{total.toLocaleString()}
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.875rem",
              mt: 2,
              lineHeight: 1.5,
            }}
          >
            This estimate is based on the options selected and may change
            slightly after final scope review.
          </Typography>
        </Box>

        <Divider sx={{ mb: 8, borderColor: "rgba(255,255,255,0.08)" }} />

        {/* What This Includes */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              mb: 4,
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
            }}
          >
            WHAT THIS INCLUDES
          </Typography>
          <Box sx={{ "& > *": { mb: 2 } }}>
            {enabledIncludedItems.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <CheckIcon
                  sx={{ fontSize: "1.25rem", color: "text.primary" }}
                />
                <Typography sx={{ fontSize: "1rem" }}>{item.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 8, borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Timeline */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              mb: 3,
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
            }}
          >
            TIMELINE
          </Typography>
          <Box>
            <Typography
              sx={{ color: "text.secondary", fontSize: "0.875rem", mb: 0.5 }}
            >
              Estimated timeline
            </Typography>
            <Typography sx={{ fontSize: "1rem" }}>
              {estimatorConfig.timeline}
            </Typography>
          </Box>
        </Box>

        {config.maintenance && (
          <>
            <Divider sx={{ mb: 8, borderColor: "rgba(255,255,255,0.08)" }} />
            <Box sx={{ mb: 10 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  mb: 3,
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                }}
              >
                MAINTENANCE
              </Typography>
              <Box>
                <Typography sx={{ fontSize: "1.125rem", mb: 2 }}>
                  Ongoing maintenance: £{estimatorConfig.maintenance.price} /
                  month
                </Typography>
                <Box component="ul" sx={{ listStyle: "none", pl: 0, m: 0 }}>
                  {estimatorConfig.maintenance.services.map(
                    (service, index) => (
                      <Typography
                        key={index}
                        component="li"
                        sx={{
                          fontSize: "1rem",
                          mb: 0.5,
                          color: "text.secondary",
                        }}
                      >
                        • {service}
                      </Typography>
                    ),
                  )}
                </Box>
              </Box>
            </Box>
          </>
        )}

        {/* CTA */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            href={`/contact?estimate=${encodeURIComponent(
              JSON.stringify(config),
            )}`}
            sx={{
              px: 6,
              py: 1.75,
              fontSize: "1rem",
              mb: 2,
            }}
          >
            Request Full Quote
          </Button>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.875rem",
              mb: 4,
            }}
          >
            No commitment. We&apos;ll review your estimate and get back to you.
          </Typography>

          <Link href="/estimator" passHref>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                px: 4,
                py: 1.25,
                fontSize: "0.875rem",
              }}
            >
              Adjust Configuration
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default function EstimatePage() {
  return (
    <Suspense fallback={<EstimateSkeleton />}>
      <EstimateContent />
    </Suspense>
  );
}
