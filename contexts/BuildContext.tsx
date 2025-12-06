import React, { createContext, ReactNode, useContext, useState } from 'react';

// Types
export type PartSlot = 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'PSU' | 'Case';

export interface BuildPart {
  id: string;
  title: string;
  price: number;
  image?: string;
  category_id?: string; // ID of the category
}

interface BuildContextType {
  build: Record<PartSlot, BuildPart | null>;
  compatibilityIssues: string[];
  addPart: (slot: PartSlot, part: BuildPart) => void;
  removePart: (slot: PartSlot) => void;
  clearBuild: () => void;
  totalPrice: number;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

// Spec Keywords for MVP Regex Matching
const SOCKETS = ['AM5', 'AM4', 'LGA1700', 'LGA1200'];
const RAM_TYPES = ['DDR5', 'DDR4', 'DDR3'];

export function BuildProvider({ children }: { children: ReactNode }) {
  const [build, setBuild] = useState<Record<PartSlot, BuildPart | null>>({
    CPU: null,
    GPU: null,
    Motherboard: null,
    RAM: null,
    Storage: null,
    PSU: null,
    Case: null,
  });

  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);

  // Calculate Total Price
  const totalPrice = Object.values(build).reduce((sum, part) => sum + (part?.price || 0), 0);

  // Core Compatibility Engine
  const checkCompatibility = (currentBuild: Record<PartSlot, BuildPart | null>) => {
    const issues: string[] = [];
    const cpu = currentBuild.CPU;
    const mobo = currentBuild.Motherboard;
    const ram = currentBuild.RAM;

    // 1. CPU <-> Motherboard Socket Match
    if (cpu && mobo) {
      const cpuSocket = SOCKETS.find(s => cpu.title.toUpperCase().includes(s));
      const moboSocket = SOCKETS.find(s => mobo.title.toUpperCase().includes(s));

      if (cpuSocket && moboSocket && cpuSocket !== moboSocket) {
        issues.push(`Incompatible Socket: CPU is ${cpuSocket}, but Motherboard is ${moboSocket}.`);
      } else if (cpuSocket && !moboSocket) {
         // Warning?
      }
    }

    // 2. Motherboard <-> RAM Type Match
    if (mobo && ram) {
      const moboRam = RAM_TYPES.find(t => mobo.title.toUpperCase().includes(t));
      const ramType = RAM_TYPES.find(t => ram.title.toUpperCase().includes(t));

      if (moboRam && ramType && moboRam !== ramType) {
        issues.push(`Incompatible RAM: Motherboard supports ${moboRam}, but RAM is ${ramType}.`);
      }
    }

    setCompatibilityIssues(issues);
  };

  const addPart = (slot: PartSlot, part: BuildPart) => {
    const newBuild = { ...build, [slot]: part };
    setBuild(newBuild);
    checkCompatibility(newBuild);
  };

  const removePart = (slot: PartSlot) => {
    const newBuild = { ...build, [slot]: null };
    setBuild(newBuild);
    checkCompatibility(newBuild);
  };

  const clearBuild = () => {
    setBuild({
      CPU: null,
      GPU: null,
      Motherboard: null,
      RAM: null,
      Storage: null,
      PSU: null,
      Case: null,
    });
    setCompatibilityIssues([]);
  };

  return (
    <BuildContext.Provider value={{ build, compatibilityIssues, addPart, removePart, clearBuild, totalPrice }}>
      {children}
    </BuildContext.Provider>
  );
}

export const useBuild = () => {
  const context = useContext(BuildContext);
  if (!context) {
    throw new Error('useBuild must be used within a BuildProvider');
  }
  return context;
};
