"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AdvancedAnalysisProps {
  matrix: number[][];
  labels: string[];
  regression: {
    rSquared: string;
    adjRSquared: string;
    fStat: string;
    pValue: string;
    stdError: string;
  };
}

export const AdvancedAnalysis = ({
  matrix,
  labels,
  regression,
}: AdvancedAnalysisProps) => {
  const getCellColor = (value: number) => {
    if (value === 1) return "bg-primary text-primary-foreground";
    if (value > 0.8) return "bg-primary/80 text-primary-foreground";
    if (value > 0.6) return "bg-primary/60 text-primary-foreground";
    if (value > 0.4) return "bg-primary/40 text-foreground";
    if (value > 0.2) return "bg-primary/20 text-foreground";
    return "bg-primary/5 text-muted-foreground";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="lg:col-span-2"
      >
        <Card className="bg-card/40 backdrop-blur-md border-muted-foreground/10 rounded-2xl overflow-hidden shadow-xl shadow-primary/5 h-full">
          <CardHeader>
            <CardTitle className="text-xl font-black text-foreground">
              Correlation Matrix
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Visualizing linear relationships between selected key parameters.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-5 gap-2 text-center items-center">
              <div />
              {labels.map((label) => (
                <div key={label} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {label}
                </div>
              ))}
              
              {matrix.map((row, i) => (
                <React.Fragment key={i}>
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-left">
                    {labels[i]}
                  </div>
                  {row.map((val, j) => (
                    <motion.div
                      key={j}
                      whileHover={{ scale: 1.05 }}
                      className={`h-14 flex items-center justify-center rounded-xl font-bold text-sm transition-all shadow-sm ${getCellColor(val)}`}
                    >
                      {val.toFixed(2)}
                    </motion.div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            
            <div className="mt-8 flex items-center justify-end gap-3 text-[10px] uppercase font-bold text-muted-foreground">
              <span>Low Correlation</span>
              <div className="flex gap-1 h-3">
                <div className="w-6 bg-primary/5 rounded" />
                <div className="w-6 bg-primary/40 rounded" />
                <div className="w-6 bg-primary/80 rounded" />
              </div>
              <span>High Correlation</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0 }}
        className="lg:col-span-1"
      >
        <Card className="bg-card/40 backdrop-blur-md border-muted-foreground/10 rounded-2xl overflow-hidden shadow-xl shadow-primary/5 h-full">
          <CardHeader>
            <CardTitle className="text-xl font-black text-foreground">
              Regression Metrics
            </CardTitle>
            <p className="text-sm text-muted-foreground">Model performance indicators.</p>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <span className="text-sm font-black uppercase tracking-tight text-muted-foreground">R-Squared</span>
                <span className="text-2xl font-black text-primary">{regression.rSquared}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/20 border border-muted-foreground/10">
                <span className="text-sm font-black uppercase tracking-tight text-muted-foreground">Adj. R²</span>
                <span className="text-2xl font-black text-foreground">{regression.adjRSquared}</span>
              </div>
            </div>
            
            <Separator className="bg-border/30" />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-muted-foreground">F-Statistic</span>
                <span className="font-black">{regression.fStat}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-muted-foreground">P-Value (Prob)</span>
                <Badge variant="outline" className="text-[10px] font-black h-5 uppercase bg-green-500/10 text-green-600 border-green-500/20">{regression.pValue}</Badge>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-muted-foreground">Standard Error</span>
                <span className="font-black">{regression.stdError}</span>
              </div>
            </div>
            
            <div className="pt-4">
               <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                * Our regression model uses an Ordinary Least Squares (OLS) approach with iterative parameter optimization.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
