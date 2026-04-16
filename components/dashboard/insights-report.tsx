"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InsightsReportProps {
  executiveSummary: string;
  items: {
    type: "positive" | "neutral" | "warning";
    title: string;
    text: string;
  }[];
}

const getIcon = (type: string) => {
  if (type === "positive") return <CheckCircle2 className="h-4 w-4 text-green-600" />;
  if (type === "warning") return <AlertTriangle className="h-4 w-4 text-amber-600" />;
  return <Lightbulb className="h-4 w-4 text-blue-600" />;
};

const getColors = (type: string) => {
  if (type === "positive") return "bg-green-500/5 border-green-500/20";
  if (type === "warning") return "bg-amber-500/5 border-amber-500/20";
  return "bg-blue-500/5 border-blue-500/20";
};

export const InsightsReport = ({
  executiveSummary,
  items,
}: InsightsReportProps) => {
  const [displayText, setDisplayText] = useState("");
  const fullText = executiveSummary;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
          <Brain className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-foreground">Discovery Engine</h2>
          <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI-Generated Insight Report
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.2 }}
           className="lg:col-span-2"
        >
          <Card className="bg-primary/5 backdrop-blur-md border-primary/10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/5 h-full">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                   <Badge className="bg-primary text-primary-foreground px-3 font-black h-6 uppercase text-[10px]">Executive Summary</Badge>
                   <div className="h-1 flex-grow bg-primary/10 rounded-full" />
                </div>
                <p className="text-xl font-bold text-foreground/90 leading-relaxed italic border-l-4 border-primary pl-6 py-2 min-h-[100px]">
                   "{displayText}"
                   <motion.span
                     animate={{ opacity: [1, 0] }}
                     transition={{ repeat: Infinity, duration: 0.8 }}
                     className="inline-block w-1.5 h-6 bg-primary ml-1 translate-y-1"
                   />
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="lg:col-span-1 flex flex-col gap-4">
          {items.map((insight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + idx * 0.1 }}
            >
              <Card className={`${getColors(insight.type)} backdrop-blur-md rounded-2xl overflow-hidden shadow-sm transition-all hover:scale-[1.02] cursor-default`}>
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-white/50 backdrop-blur shadow-sm border border-white">
                    {getIcon(insight.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-foreground uppercase tracking-tight">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-medium">{insight.text}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
