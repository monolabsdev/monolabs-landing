export interface Feature {
  id: string;
  label: string;
  price: number;
  description?: string;
  defaultEnabled: boolean;
  alwaysIncluded?: boolean; // If true, shows as "Included" instead of price
}

export interface IncludedItem {
  id: string;
  label: string;
  toggleable: boolean;
  defaultEnabled: boolean;
}

export interface EstimatorConfig {
  basePrice: number;
  pricePerPage: {
    amount: number;
    min: number;
    max: number;
    default: number;
  };
  features: Feature[];
  maintenance: {
    price: number;
    services: string[];
  };
  includedItems: IncludedItem[];
  timeline: string;
}

export type EstimatorConfigState = {
  pages: number;
  [key: string]: number | boolean;
  maintenance: boolean;
} & Record<string, boolean | number>;

export const estimatorConfig: EstimatorConfig = {
  // Base build price
  basePrice: 450,

  // Pages configuration
  pricePerPage: {
    amount: 75,
    min: 1,
    max: 20,
    default: 5,
  },

  // Features that can be toggled on/off
  features: [
    {
      id: "simple-animations",
      label: "Simple animations",
      price: 0,
      description: "Smooth transitions and micro-interactions",
      defaultEnabled: true,
      alwaysIncluded: true,
    },
    {
      id: "contactForm",
      label: "Contact form",
      price: 50,
      description: "Custom contact form with validation",
      defaultEnabled: true,
      alwaysIncluded: false,
    },
    {
      id: "blog",
      label: "Blog / CMS",
      price: 200,
      description: "Content management system for blog posts",
      defaultEnabled: true,
    },
    {
      id: "ecommerce",
      label: "E-commerce integration",
      price: 500,
      description: "Shopping cart and payment processing",
      defaultEnabled: false,
    },
    {
      id: "booking",
      label: "Booking system",
      price: 350,
      description: "Appointment scheduling functionality",
      defaultEnabled: false,
    },
    {
      id: "multiLanguage",
      label: "Multi-language support",
      price: 300,
      description: "Support for multiple languages",
      defaultEnabled: false,
    },
  ],

  // Maintenance pricing and services
  maintenance: {
    price: 50,
    services: [
      "Updates",
      "Small content changes",
      "Support",
      "Security monitoring",
    ],
  },

  // Items included in the base package
  includedItems: [
    {
      id: "customDesign",
      label: "Custom design (no templates)",
      toggleable: false,
      defaultEnabled: true,
    },
    {
      id: "responsive",
      label: "Mobile-first & responsive",
      toggleable: false,
      defaultEnabled: true,
    },
    {
      id: "fastLoad",
      label: "Fast load times",
      toggleable: false,
      defaultEnabled: true,
    },
    {
      id: "basicSeo",
      label: "Basic SEO setup",
      toggleable: true,
      defaultEnabled: true,
    },
    {
      id: "hosting",
      label: "Hosting & domain guidance",
      toggleable: true,
      defaultEnabled: true,
    },
    {
      id: "revisions",
      label: "One round of revisions",
      toggleable: true,
      defaultEnabled: true,
    },
    {
      id: "analytics",
      label: "Analytics integration",
      toggleable: true,
      defaultEnabled: false,
    },
    {
      id: "socialMedia",
      label: "Social media integration",
      toggleable: true,
      defaultEnabled: false,
    },
  ],

  // Project timeline
  timeline: "2-3 weeks from project start. Timings vary.",
};

export function getEnabledFeatures(
  config: Record<string, boolean | number>,
): Feature[] {
  return estimatorConfig.features.filter((feature) => config[feature.id]);
}

// Helper function to calculate total price
export function calculateTotalPrice(config: {
  pages: number;
  [key: string]: boolean | number;
}): number {
  let total = estimatorConfig.basePrice;

  // Add pages cost
  total += config.pages * estimatorConfig.pricePerPage.amount;

  // Add enabled features
  estimatorConfig.features.forEach((feature) => {
    if (config[feature.id] && !feature.alwaysIncluded) {
      total += feature.price;
    }
  });

  return total;
}

export function getEnabledIncludedItems(
  config: Record<string, boolean | number>,
): IncludedItem[] {
  return estimatorConfig.includedItems.filter(
    (item) => !item.toggleable || config[item.id],
  );
}

// Default configuration
export function getDefaultConfig(): Record<string, boolean | number> {
  const config: Record<string, boolean | number> = {
    pages: estimatorConfig.pricePerPage.default,
    maintenance: false,
  };

  // Add default feature states
  estimatorConfig.features.forEach((feature) => {
    config[feature.id] = feature.defaultEnabled;
  });

  // Add default included item states
  estimatorConfig.includedItems.forEach((item) => {
    config[item.id] = item.defaultEnabled;
  });

  return config;
}
