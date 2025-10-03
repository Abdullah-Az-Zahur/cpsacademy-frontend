
import { Plan } from "@/types/plan";

export const plans: Plan[] = [
  {
    id: "starter",
    title: "Starter",
    description: "Perfect for getting started with essential features",
    price: {
      individual: {
        monthly: 9,
        yearly: 90,
      },
      team: {
        monthly: 19,
        yearly: 190,
      },
    },
    features: {
      individual: [
        "Up to 3 projects",
        "5GB storage",
        "Basic analytics & reports",
        "Email support (48h response)",
        "1 user included",
      ],
      team: [
        "Up to 5 projects",
        "10GB storage",
        "Basic analytics & reports",
        "Email support (24h response)",
        "3 team members included",
        "Basic collaboration tools",
      ],
    },
    cta: "Get Started",
    planTier: "starter",
  },
  {
    id: "professional",
    title: "Professional",
    description: "Advanced features for growing businesses",
    price: {
      individual: {
        monthly: 19,
        yearly: 190,
      },
      team: {
        monthly: 49,
        yearly: 490,
      },
    },
    features: {
      individual: [
        "Up to 10 projects",
        "20GB storage",
        "Advanced analytics & reports",
        "Priority support (12h response)",
        "Custom branding",
        "API access (read-only)",
      ],
      team: [
        "Unlimited projects",
        "50GB storage",
        "Advanced analytics & reports",
        "Priority support (6h response)",
        "10 team members included",
        "Custom domains & branding",
        "Full API access",
        "Advanced collaboration tools",
      ],
    },
    cta: "Choose Plan",
    mostPopular: true, // This will show for both individual and team
    planTier: "professional",
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "Complete solution for large organizations",
    price: {
      individual: {
        monthly: 49,
        yearly: 490,
      },
      team: {
        monthly: 99,
        yearly: 990,
      },
    },
    features: {
      individual: [
        "Unlimited projects",
        "50GB storage",
        "Advanced analytics with custom metrics",
        "24/7 premium support",
        "White-label branding",
        "Full API access",
        "Custom integrations",
        "SLA guarantee",
      ],
      team: [
        "Unlimited projects & storage",
        "1TB storage + additional options",
        "Advanced analytics with custom metrics",
        "24/7 dedicated support with account manager",
        "Unlimited team members",
        "White-label branding & custom domains",
        "Full API access with extended limits",
        "Custom integrations & development",
        "SLA guarantee (99.9% uptime)",
        "Advanced security & compliance features",
        "Onboarding & training sessions",
      ],
    },
    cta: "Contact Sales",
    planTier: "enterprise",
  },
];
