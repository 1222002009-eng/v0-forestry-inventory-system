"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { TPK_GEOJSON_DATA, WoodBlock, GeoJSONCollection } from "@/lib/geojson-data";

export type UserRole = "admin" | "staff";

export interface User {
  username: string;
  role: UserRole;
}

interface AppContextType {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;

  // Data
  woodBlocks: WoodBlock[];
  geoJsonData: GeoJSONCollection;
  updateWoodBlock: (id: string, updates: Partial<WoodBlock>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [woodBlocks, setWoodBlocks] = useState<WoodBlock[]>(
    TPK_GEOJSON_DATA.features.map((f) => f.properties)
  );

  const login = useCallback((username: string, password: string): boolean => {
    if (username === "admin" && password === "admin") {
      setUser({ username: "admin", role: "admin" });
      return true;
    } else if (username === "staff" && password === "staff") {
      setUser({ username: "staff", role: "staff" });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateWoodBlock = useCallback(
    (id: string, updates: Partial<WoodBlock>) => {
      setWoodBlocks((prev) =>
        prev.map((block) => (block.id === id ? { ...block, ...updates } : block))
      );
    },
    []
  );

  // Update GeoJSON when wood blocks change
  const geoJsonData: GeoJSONCollection = {
    type: "FeatureCollection",
    features: TPK_GEOJSON_DATA.features.map((feature) => {
      const updatedBlock = woodBlocks.find((b) => b.id === feature.properties.id);
      return {
        ...feature,
        properties: updatedBlock || feature.properties,
      };
    }),
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
        woodBlocks,
        geoJsonData,
        updateWoodBlock,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
