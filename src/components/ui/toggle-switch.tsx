// components/ui/toggle-switch.tsx
"use client";

import React from "react";

interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  label: string;
  enabledLabel?: string;
  disabledLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  enabled,
  setEnabled,
  label,
  enabledLabel = "Yearly",
  disabledLabel = "Monthly",
}) => {
  return (
    <div className="flex items-center justify-center mt-6 bg-white/50 backdrop-blur-sm rounded-full py-2 px-4 border border-white/30">
      <span className="mr-3 text-sm font-medium text-gray-600">
        {disabledLabel}
      </span>
      <button
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        onClick={() => setEnabled(!enabled)}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </button>
      <span className="ml-3 text-sm font-medium text-gray-600">
        {enabledLabel}
        {/* {enabled && <span className="text-green-600 ml-1">(Save 17%)</span>} */}
      </span>
    </div>
  );
};

export default ToggleSwitch;
