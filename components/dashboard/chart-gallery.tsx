"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ChartGalleryProps {
  chartsData: {
    bar: { name: string; value: number }[];
    line: { name: string; value: number }[];
    pie: { name: string; value: number }[];
    breakdown: { label: string; value: number }[];
  };
}

const COLORS = ["#000", "#333", "#666", "#999", "#ccc"];

export const ChartGallery = ({ chartsData }: ChartGalleryProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card/40 backdrop-blur-md border-muted-foreground/10 rounded-2xl overflow-hidden shadow-xl shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-widest text-muted-foreground/80">
              Distribution Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartsData.bar}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-card/40 backdrop-blur-md border-muted-foreground/10 rounded-2xl overflow-hidden shadow-xl shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-widest text-muted-foreground/80">
              Trend Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartsData.line}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--primary)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="lg:col-span-1"
      >
        <Card className="bg-card/40 backdrop-blur-md border-muted-foreground/10 rounded-2xl overflow-hidden shadow-xl shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-widest text-muted-foreground/80">
              Category Proportions
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartsData.pie}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {chartsData.pie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="lg:col-span-1"
      >
        <Card className="bg-card/40 backdrop-blur-md border-muted-foreground/10 rounded-2xl overflow-hidden shadow-xl shadow-primary/5 h-full">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-widest text-muted-foreground/80">
              Analysis Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            {chartsData.breakdown.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>{item.label}</span>
                  <span className="text-primary">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-muted/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1.5, delay: 1 + idx * 0.2 }}
                    className="h-full bg-primary rounded-full shadow-lg shadow-primary/20"
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground mt-8 leading-relaxed italic">
              * Calculations are based on the latest 10,000 iterations of the predictive engine.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
