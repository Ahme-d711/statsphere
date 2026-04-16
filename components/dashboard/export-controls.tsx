"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, FileCode, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ExportControls = () => {
  const [exporting, setExporting] = useState<"none" | "pdf" | "csv">("none");
  const [success, setSuccess] = useState<"none" | "pdf" | "csv">("none");

  const handleExport = (type: "pdf" | "csv") => {
    setExporting(type);
    setTimeout(() => {
      setExporting("none");
      setSuccess(type);
      setTimeout(() => setSuccess("none"), 3000);
    }, 2000);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-12 bg-primary/10 rounded-3xl border-2 border-primary/20 backdrop-blur-md mb-24 overflow-hidden relative group">
      <div className="flex items-center gap-6 mb-8 md:mb-0 relative z-10 text-center md:text-left">
        <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/30 group-hover:scale-110 transition-transform">
           <Download className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-foreground">Archive Findings</h2>
          <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest mt-1">
             Permanent copies available in PDF and CSV format
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <Button
          size="lg"
          variant="outline"
          onClick={() => handleExport("pdf")}
          disabled={exporting !== "none"}
          className="rounded-2xl h-14 px-8 border-primary/20 hover:bg-white hover:text-primary hover:border-primary/40 font-black shadow-lg transition-all"
        >
          {exporting === "pdf" ? (
             <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : success === "pdf" ? (
             <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
          ) : (
             <FileText className="mr-2 h-5 w-5" />
          )}
          Export PDF
        </Button>

        <Button
          size="lg"
          onClick={() => handleExport("csv")}
          disabled={exporting !== "none"}
          className="rounded-2xl h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-black shadow-xl shadow-primary/20 transition-all"
        >
          {exporting === "csv" ? (
             <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : success === "csv" ? (
             <CheckCircle2 className="mr-2 h-5 w-5 text-white" />
          ) : (
             <FileCode className="mr-2 h-5 w-5" />
          )}
          Export CSV
        </Button>
      </div>

      {/* Decorative background effects */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-3xl -translate-y-20 translate-x-20" />
      <div className="absolute bottom-0 left-0 h-40 w-40 bg-primary/5 rounded-full blur-3xl translate-y-20 -translate-x-20" />
    </div>
  );
};
