// components/plan-column.tsx
"use client";

import React from "react";
import { Plan, PlanType, BillingCycle } from "@/types/plan";
import { Button } from "@/components/ui/button";

interface PlanColumnProps {
  plan: Plan;
  billingCycle: BillingCycle;
  planType: PlanType;
  isAnnual: boolean;
  isPopular?: boolean;
  className?: string;
}

const PlanColumn: React.FC<PlanColumnProps> = ({
  plan,
  billingCycle,
  planType,
  isAnnual,
  isPopular = false,
  className = "",
}) => {
  const price = plan.price[planType][billingCycle];
  const features = plan.features[planType];

  return (
    <div
      className={`flex flex-col h-full ${className} ${isPopular ? "relative" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
            Most Popular
          </div>
        </div>
      )}

      <div className={`flex flex-col flex-1 p-6 rounded-lg `}>
        <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
        <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>

        <div className="my-6">
          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-bold text-gray-900">${price}</span>
            <span className="text-gray-600 ml-1">
              /{billingCycle === "monthly" ? "month" : "year"}
            </span>
          </div>
          {isAnnual && (
            <p className="text-sm text-green-600 mt-1 text-center">
              Save 17% compared to monthly
            </p>
          )}
        </div>

        <ul className="space-y-3 mb-6 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className="w-full transition-all duration-200 hover:scale-105"
          variant={isPopular ? "default" : "outline"}
          size="lg"
        >
          {plan.cta}
        </Button>
      </div>
    </div>
  );
};

export default PlanColumn;
