export type PlanType = "individual" | "team";
export type BillingCycle = "monthly" | "yearly";
export type PlanTier = "starter" | "professional" | "enterprise";

export interface Plan {
  id: string;
  title: string;
  description: string;
  price: {
    individual: {
      monthly: number;
      yearly: number;
    };
    team: {
      monthly: number;
      yearly: number;
    };
  };
  features: {
    individual: string[];
    team: string[];
  };
  cta: string;
  mostPopular?: boolean;
  planTier: PlanTier;
}
