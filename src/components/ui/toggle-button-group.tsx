// components/ui/toggle-button-group.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface ToggleButtonGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`inline-flex rounded-lg border border-primary/30 bg-white/50 backdrop-blur-sm p-1 ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md ${
            value === option.value
              ? "text-white"
              : "text-primary hover:bg-primary/10"
          }`}
        >
          {value === option.value && (
            <motion.div
              layoutId="activeBackground"
              className="absolute inset-0 bg-primary rounded-md"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
