"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, Layout, Database } from "lucide-react";

interface DatasetSummaryProps {
  rowCount: number;
  colCount: number;
  columns: string[];
}

export const DatasetSummary = ({
  rowCount,
  colCount,
  columns,
}: DatasetSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
    >
      <Card className="bg-card/50 backdrop-blur-sm border-muted-foreground/10 overflow-hidden group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">
              Total Rows
            </p>
            <h3 className="text-3xl font-bold text-foreground">
              {rowCount.toLocaleString()}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Layout className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-muted-foreground/10 overflow-hidden group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">
              Total Columns
            </p>
            <h3 className="text-3xl font-bold text-foreground">{colCount}</h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Table className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-muted-foreground/10 overflow-hidden md:col-span-1 group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3 font-medium text-sm text-muted-foreground uppercase tracking-wider">
            <span>Detected Columns</span>
            <Database className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-wrap gap-2 max-h-16 overflow-y-auto pr-1 thin-scrollbar">
            {columns.map((col, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="rounded-lg font-medium bg-secondary/50 text-xs px-2 py-0.5 hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
              >
                {col}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
