"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AnalysisResults {
  summary: {
    mean: number;
    median: number;
    stdDev: number;
    totalRecords: number;
  };
  charts: {
    distribution: { name: string; value: number }[];
    trend: { name: string; value: number }[];
    pie?: { name: string; value: number }[];
    breakdown?: { label: string; value: number }[];
  };
  advanced: {
    matrix: number[][];
    labels: string[];
    regression: {
      rSquared: string;
      adjRSquared: string;
      fStat: string;
      pValue: string;
      stdError: string;
    };
  };
  insights: {
    executiveSummary: string;
    items: {
      type: "positive" | "neutral" | "warning";
      title: string;
      text: string;
    }[];
  };
}

interface AnalyticsContextType {
  dataset: any[] | null;
  columns: string[];
  results: AnalysisResults | null;
  isLoading: boolean;
  error: string | null;
  setDataset: (data: any[], cols: string[]) => void;
  runAnalysis: (domain: "medical" | "engineering", options: string[]) => Promise<void>;
  resetAnalysis: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [dataset, setDatasetState] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setDataset = (data: any[], cols: string[]) => {
    setDatasetState(data);
    setColumns(cols);
    setResults(null); // Clear previous results when new data is uploaded
  };

  const runAnalysis = async (domain: "medical" | "engineering", options: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataset, domain, options }),
      });

      if (!response.ok) {
        throw new Error("Failed to process analysis. Please try again.");
      }

      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setDatasetState(null);
    setColumns([]);
    setResults(null);
    setIsLoading(false);
    setError(null);
  };

  return (
    <AnalyticsContext.Provider
      value={{
        dataset,
        columns,
        results,
        isLoading,
        error,
        setDataset,
        runAnalysis,
        resetAnalysis,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}
