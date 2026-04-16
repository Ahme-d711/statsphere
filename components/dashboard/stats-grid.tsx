"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
  percentage: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, idx) => {
        const TrendIcon =
          stat.trend === "up"
            ? TrendingUp
            : stat.trend === "down"
            ? TrendingDown
            : Minus;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-card/40 backdrop-blur-md border-muted-foreground/10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <div
                    className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
                      stat.trend === "up"
                        ? "bg-green-500/10 text-green-600"
                        : stat.trend === "down"
                        ? "bg-red-500/10 text-red-600"
                        : "bg-blue-500/10 text-blue-600"
                    )}
                  >
                    <TrendIcon className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black text-foreground tracking-tighter">
                    {stat.value}
                  </h3>
                  <span
                    className={cn(
                      "text-xs font-bold",
                      stat.trend === "up"
                        ? "text-green-600"
                        : stat.trend === "down"
                        ? "text-red-600"
                        : "text-blue-600"
                    )}
                  >
                    {stat.percentage}
                  </span>
                </div>
                <div className="mt-4 h-1 w-full bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                    className="h-full bg-primary/40 rounded-full"
                    style={{ width: "65%" }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
