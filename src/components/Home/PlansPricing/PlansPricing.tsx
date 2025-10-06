// components/plans-pricing.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlanType, BillingCycle } from "@/types/plan";
import { plans } from "@/data/plans";

import PlanColumn from "./PlanColumn/PlanColumn";
import Marquee from "../Marquee/Marquee";
import ToggleButtonGroup from "@/components/ui/toggle-button-group";
import ToggleSwitch from "@/components/ui/toggle-switch";
import { plansMarquee } from "@/data/plansMarquee";

const PlansPricing: React.FC = () => {
  const [planType, setPlanType] = useState<PlanType>("individual");
  const [isAnnual, setIsAnnual] = useState(false);

  const billingCycle: BillingCycle = isAnnual ? "yearly" : "monthly";

  const sortedPlans = [...plans].sort((a, b) => {
    const tierOrder = { starter: 0, professional: 1, enterprise: 2 };
    return tierOrder[a.planTier] - tierOrder[b.planTier];
  });

  return (
    <section className="pt-16  bg-gradient-to-b from-gray-50 to-blue-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Plans & Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include our core
            features with scalable options for individuals and teams.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <ToggleButtonGroup
            options={[
              { value: "individual", label: "For Individuals" },
              { value: "team", label: "For Teams" },
            ]}
            value={planType}
            onChange={(value) => setPlanType(value as PlanType)}
            className="mb-8"
          />

          <ToggleSwitch
            enabled={isAnnual}
            setEnabled={setIsAnnual}
            label="Billing cycle"
            enabledLabel="Yearly"
            disabledLabel="Monthly"
          />

          <div className="mt-8 -mb-4 relative z-10">
            <div className="bg-primary text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg">
              Best Opportunity - Save up to 30% with yearly billing
            </div>
          </div>

          <div className="mt-8 w-full">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${planType}-${billingCycle}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-0"
                >
                  {sortedPlans.map((plan, index) => (
                    <PlanColumn
                      key={plan.id}
                      plan={plan}
                      billingCycle={billingCycle}
                      planType={planType}
                      isAnnual={isAnnual}
                      isPopular={plan.mostPopular}
                      className={
                        index === 1
                          ? "md:border-l md:border-r border-white/30 md:px-6"
                          : ""
                      }
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              All plans come with a 14-day free trial. No credit card required.
            </p>
            <p className="mt-2">
              Need help choosing?{" "}
              <a href="#" className="text-primary hover:underline">
                Contact our sales team
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex my-5">
        <Marquee
          data={plansMarquee}
          displayMode="textWithAsterisks"
          className="py-3 bg-primary"
          textStyle="font-medium"
          asteriskStyle="text-red-500 mx-2 text-xl"
        />
      </div>
    </section>
  );
};

export default PlansPricing;
