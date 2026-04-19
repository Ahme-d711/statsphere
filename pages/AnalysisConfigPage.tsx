"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { DatasetSummary } from "@/components/analysis/dataset-summary";
import { AnalysisOptions } from "@/components/analysis/analysis-options";
import { ColumnSelector } from "@/components/analysis/column-selector";
import { ModuleSelector } from "@/components/analysis/module-selector";
import { UploadFooter } from "@/components/upload/upload-footer";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, ArrowLeft, Settings2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAnalytics } from "@/context/AnalyticsContext";

export default function AnalysisConfigPage() {
  const router = useRouter();
  const { dataset, columns: contextColumns, isLoading, runAnalysis } = useAnalytics();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["mean", "median", "std_dev"]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleRunAnalysis = async () => {
    if (canRun && selectedModule) {
      await runAnalysis(selectedModule as "medical" | "engineering", selectedOptions, selectedColumns);
      router.push(`/dashboard?domain=${selectedModule}`);
    }
  };

  const handleOptionToggle = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setSelectedColumns([]);
    setSelectedModule(null);
  };

  const canRun = selectedOptions.length > 0 && selectedModule !== null;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top, var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/upload"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Upload
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
              <Settings2 className="h-9 w-9 text-primary" />
              Configure Analysis
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              Review your data and select the statistical modules you want to execute.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleReset}
              className="rounded-2xl h-12 px-6 border-muted-foreground/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 font-bold transition-all"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Config
            </Button>
            <Button
              size="lg"
              disabled={!canRun || isLoading}
              onClick={handleRunAnalysis}
              className="rounded-2xl h-12 px-10 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    Processing...
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Run Analysis
                    <Play className="h-5 w-5 fill-current" />
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </Button>
          </motion.div>
        </div>

        <div className="space-y-8">
          <DatasetSummary
            rowCount={dataset?.length || 0}
            colCount={contextColumns.length}
            columns={contextColumns}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnalysisOptions
                selectedOptions={selectedOptions}
                onOptionToggle={handleOptionToggle}
              />
            </div>
            <div className="lg:col-span-1">
              <ColumnSelector
                options={contextColumns}
                selectedColumns={selectedColumns}
                onChange={setSelectedColumns}
              />
            </div>
          </div>

          <ModuleSelector
            selectedModule={selectedModule}
            onSelect={setSelectedModule}
          />
        </div>
      </main>

      <UploadFooter />
    </div>
  );
}
