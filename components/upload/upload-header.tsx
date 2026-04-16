"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const UploadHeader = () => {
  return (
    <div className="flex flex-col items-center text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 mb-4">
          <Sparkles className="mr-2 h-3.5 w-3.5" />
          Dataset Ready for Analysis
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Upload your dataset
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Get instant statistical insights from your data. Simply upload your
          CSV or Excel file to begin the analysis.
        </p>
      </motion.div>
    </div>
  );
};
