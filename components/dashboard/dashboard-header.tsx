"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Beaker, FileSpreadsheet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  datasetName: string;
  domain: "medical" | "engineering";
}

export const DashboardHeader = ({
  datasetName,
  domain,
}: DashboardHeaderProps) => {
  const Icon = domain === "medical" ? Beaker : Activity;

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-2 text-primary font-bold tracking-tight uppercase text-xs">
          <FileSpreadsheet className="h-4 w-4" />
          Analytics Dashboard
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {datasetName}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            variant="outline"
            className="rounded-lg px-3 py-1 bg-primary/5 border-primary/20 text-primary flex items-center gap-1.5 font-bold"
          >
            <Icon className="h-3.5 w-3.5" />
            {domain === "medical" ? "Medical Context" : "Engineering Context"}
          </Badge>
          <span className="text-muted-foreground text-sm">• Generated on {new Date().toLocaleDateString()}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4"
      >
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Data Reliability
          </p>
          <p className="text-xl font-black text-foreground tracking-tighter">
            99.2<span className="text-primary text-sm ml-0.5">%</span>
          </p>
        </div>
        <div className="h-12 w-[1px] bg-border hidden sm:block" />
        <div className="text-right">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Processing Speed
          </p>
          <p className="text-xl font-black text-foreground tracking-tighter">
            0.42<span className="text-primary text-sm ml-0.5">s</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
