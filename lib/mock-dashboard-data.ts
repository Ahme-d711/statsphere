import { CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import React from "react";

export interface DashboardData {
  datasetName: string;
  stats: {
    label: string;
    value: string;
    trend: "up" | "down" | "neutral";
    percentage: string;
  }[];
  charts: {
    bar: { name: string; value: number }[];
    line: { name: string; value: number }[];
    pie: { name: string; value: number }[];
    breakdown: { label: string; value: number }[];
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

export const MEDICAL_DATA: DashboardData = {
  datasetName: "Clinical_Trial_Phase_IV",
  stats: [
    { label: "Patient Recovery", value: "84.2%", trend: "up", percentage: "+5.1%" },
    { label: "Avg Heart Rate", value: "72 bpm", trend: "neutral", percentage: "0.0%" },
    { label: "Systolic Variance", value: "14.2", trend: "down", percentage: "-1.8%" },
    { label: "Active Samples", value: "4,250", trend: "up", percentage: "+2.4%" },
  ],
  charts: {
    bar: [
      { name: "Control", value: 340 },
      { name: "Group A", value: 410 },
      { name: "Group B", value: 390 },
      { name: "Group C", value: 450 },
      { name: "Placebo", value: 280 },
    ],
    line: [
      { name: "Wk 1", value: 65 },
      { name: "Wk 2", value: 72 },
      { name: "Wk 3", value: 68 },
      { name: "Wk 4", value: 84 },
      { name: "Wk 5", value: 91 },
      { name: "Wk 6", value: 89 },
      { name: "Wk 7", value: 95 },
    ],
    pie: [
      { name: "Recovered", value: 4500 },
      { name: "Stable", value: 3200 },
      { name: "Monitoring", value: 1200 },
      { name: "At Risk", value: 400 },
    ],
    breakdown: [
      { label: "Trial Accuracy", value: 98 },
      { label: "Patient Retention", value: 85 },
      { label: "Drug Efficacy", value: 74 },
    ],
  },
  advanced: {
    matrix: [
      [1.0, 0.82, 0.45, 0.12],
      [0.82, 1.0, 0.38, 0.05],
      [0.45, 0.38, 1.0, 0.76],
      [0.12, 0.05, 0.76, 1.0],
    ],
    labels: ["Age", "BP", "BMI", "Glucose"],
    regression: {
      rSquared: "0.962",
      adjRSquared: "0.948",
      fStat: "1042.8",
      pValue: "Significant",
      stdError: "0.024",
    },
  },
  insights: {
    executiveSummary: "The Phase IV trial demonstrates exceptional efficacy with a high recovery rate and minimal variance in physiological markers. Patient vitals remain stable across all key demographics, with a significant growth in successful drug responses noted in the final three weeks.",
    items: [
      {
        type: "positive",
        title: "Metabolic Synergy",
        text: "Strong correlation observed between glucose stability and secondary recovery indices.",
      },
      {
        type: "neutral",
        title: "Demographic Shift",
        text: "Minor right-skew in age distribution towards the 45-60 cohort in recent intakes.",
      },
      {
        type: "warning",
        title: "Dosage Sensitivity",
        text: "Identified small clusters of adverse reactions when dosage exceeds 500mg/day.",
      },
    ],
  },
};

export const ENGINEERING_DATA: DashboardData = {
  datasetName: "Vibration_Analysis_V2",
  stats: [
    { label: "Bearing Efficiency", value: "92.8%", trend: "up", percentage: "+1.2%" },
    { label: "Mean Torque", value: "450 Nm", trend: "up", percentage: "+3.4%" },
    { label: "Thermal Variance", value: "4.2°C", trend: "down", percentage: "-0.5%" },
    { label: "Machine Cycles", value: "85,400", trend: "up", percentage: "+15.2%" },
  ],
  charts: {
    bar: [
      { name: "Turbine 1", value: 880 },
      { name: "Turbine 2", value: 920 },
      { name: "Turbine 3", value: 840 },
      { name: "Main Pump", value: 760 },
      { name: "Gen-Set", value: 650 },
    ],
    line: [
      { name: "0hr", value: 12 },
      { name: "4hr", value: 18 },
      { name: "8hr", value: 45 },
      { name: "12hr", value: 52 },
      { name: "16hr", value: 38 },
      { name: "20hr", value: 24 },
      { name: "24hr", value: 15 },
    ],
    pie: [
      { name: "Optimal", value: 6200 },
      { name: "Normal", value: 2800 },
      { name: "Service", value: 800 },
      { name: "Critical", value: 200 },
    ],
    breakdown: [
      { label: "Structural Integrity", value: 96 },
      { label: "Throughput Offset", value: 91 },
      { label: "Load Balancing", value: 68 },
    ],
  },
  advanced: {
    matrix: [
      [1.0, 0.74, 0.32, 0.91],
      [0.74, 1.0, 0.15, 0.62],
      [0.32, 0.15, 1.0, 0.28],
      [0.91, 0.62, 0.28, 1.0],
    ],
    labels: ["RPM", "Torque", "Temp", "Load"],
    regression: {
      rSquared: "0.884",
      adjRSquared: "0.871",
      fStat: "842.1",
      pValue: "Significant",
      stdError: "0.045",
    },
  },
  insights: {
    executiveSummary: "Vibration patterns indicate stable structural integrity across primary rotors. Torque output has reached nominal peak efficiency during high-load cycles. We recommend monitoring thermal variance in Turbine 3 as it approached the critical threshold (45°C) during the last 8-hour window.",
    items: [
      {
        type: "positive",
        title: "Load Balancing",
        text: "The new distribution algorithm reduced primary vibration by 12% under maximum load.",
      },
      {
        type: "neutral",
        title: "Sensor Calibration",
        text: "RPM sensors show a minor drift of 0.4% which is within acceptable tolerance levels.",
      },
      {
        type: "warning",
        title: "Thermal Peak",
        text: "Localized heat signature detected in the main pump bearing after 12 cycles.",
      },
    ],
  },
};
