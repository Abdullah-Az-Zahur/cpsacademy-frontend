"use client";
import React, { createContext, useContext, useState } from "react";

interface DashboardUIContextType {
  activeFeature: string;
  setActiveFeature: (feature: string) => void;
}

const DashboardUIContext = createContext<DashboardUIContextType | undefined>(undefined);

export function DashboardUIProvider({ children }: { children: React.ReactNode }) {
  const [activeFeature, setActiveFeature] = useState("home"); // default feature

  return (
    <DashboardUIContext.Provider value={{ activeFeature, setActiveFeature }}>
      {children}
    </DashboardUIContext.Provider>
  );
}

export function useDashboardUI() {
  const context = useContext(DashboardUIContext);
  if (!context) throw new Error("useDashboardUI must be used inside DashboardUIProvider");
  return context;
}
