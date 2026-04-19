"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart2, Zap, GitBranch } from "lucide-react";

interface Option {
  id: string;
  label: string;
  category: "basic" | "relationships" | "advanced";
}

const OPTIONS: Option[] = [
  { id: "mean", label: "Mean", category: "basic" },
  { id: "median", label: "Median", category: "basic" },
  { id: "std_dev", label: "Standard Deviation", category: "basic" },
];

interface AnalysisOptionsProps {
  selectedOptions: string[];
  onOptionToggle: (id: string) => void;
}

export const AnalysisOptions = ({
  selectedOptions,
  onOptionToggle,
}: AnalysisOptionsProps) => {
  const renderSection = (
    title: string,
    icon: React.ReactNode,
    category: Option["category"]
  ) => {
    const sectionOptions = OPTIONS.filter((o) => o.category === category);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold mb-2">
          {icon}
          <span className="text-sm uppercase tracking-wider">{title}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sectionOptions.map((option) => (
            <div
              key={option.id}
              className="group flex items-center justify-between p-4 rounded-2xl border border-muted-foreground/10 bg-accent/30 hover:bg-accent/50 transition-all cursor-pointer"
              onClick={() => onOptionToggle(option.id)}
            >
              <Label
                htmlFor={option.id}
                className="flex flex-col cursor-pointer flex-grow"
              >
                <span className="font-bold text-foreground">{option.label}</span>
              </Label>
              <Switch
                id={option.id}
                checked={selectedOptions.includes(option.id)}
                onCheckedChange={() => onOptionToggle(option.id)}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-card/40 backdrop-blur-md shadow-2xl shadow-primary/5 border-muted-foreground/10 rounded-3xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-black flex items-center gap-3">
          <BarChart2 className="h-6 w-6 text-primary" />
          Statistical Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-8">
        {renderSection("Basic Calculations", <Zap className="h-4 w-4" />, "basic")}
      </CardContent>
    </Card>
  );
};
