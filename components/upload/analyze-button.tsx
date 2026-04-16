"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const AnalyzeButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center mb-24"
    >
      <Link href="/analysis">
        <Button
          size="lg"
          className="rounded-2xl cursor-pointer h-14 px-10 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all group overflow-hidden relative"
        >
          <span className="relative z-10 flex items-center gap-2">
            Analyze Data
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          />
        </Button>
      </Link>
    </motion.div>
  );
};
