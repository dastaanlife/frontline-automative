"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Service } from "@/lib/services";

type ServiceModalContextValue = {
  activeService: Service | null;
  openService: (service: Service) => void;
  closeService: () => void;
};

const ServiceModalContext = createContext<ServiceModalContextValue | null>(null);

export function ServiceModalProvider({ children }: { children: React.ReactNode }) {
  const [activeService, setActiveService] = useState<Service | null>(null);

  const openService = useCallback((service: Service) => {
    setActiveService(service);
  }, []);

  const closeService = useCallback(() => {
    setActiveService(null);
  }, []);

  const value = useMemo(
    () => ({ activeService, openService, closeService }),
    [activeService, openService, closeService]
  );

  return (
    <ServiceModalContext.Provider value={value}>
      {children}
    </ServiceModalContext.Provider>
  );
}

export function useServiceModal() {
  const ctx = useContext(ServiceModalContext);
  if (!ctx) {
    throw new Error("useServiceModal must be used within a ServiceModalProvider");
  }
  return ctx;
}
