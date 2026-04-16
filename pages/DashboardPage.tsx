"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { ChartGallery } from "@/components/dashboard/chart-gallery";
import { AdvancedAnalysis } from "@/components/dashboard/advanced-analysis";
import { ExportControls } from "@/components/dashboard/export-controls";
import { UploadFooter } from "@/components/upload/upload-footer";
import { Skeleton } from "@/components/ui/skeleton";

import { useSearchParams } from "next/navigation";
import { MEDICAL_DATA, ENGINEERING_DATA, DashboardData } from "@/lib/mock-dashboard-data";
import { useAnalytics } from "@/context/AnalyticsContext";
import { InsightsReport } from "@/components/dashboard/insights-report";

export default function DashboardPage() {
  const { results } = useAnalytics();
  const searchParams = useSearchParams();
  const domainParam = searchParams?.get("domain");
  const [loading, setLoading] = useState(true);

  const activeDomain =
    domainParam === "engineering" ? "engineering" : "medical";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Prioritize API results from context, fallback to static mock for previewing/demo
  const data: DashboardData = (results as any) || (activeDomain === "medical" ? MEDICAL_DATA : ENGINEERING_DATA);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-12 flex-grow">
          <div className="space-y-8">
            <div className="flex justify-between items-end">
               <div className="space-y-2">
                 <Skeleton className="h-4 w-32" />
                 <Skeleton className="h-12 w-64" />
                 <Skeleton className="h-6 w-48" />
               </div>
               <div className="flex gap-4">
                 <Skeleton className="h-16 w-32" />
                 <Skeleton className="h-16 w-32" />
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 rounded-2xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <Skeleton className="h-[400px] rounded-2xl" />
               <Skeleton className="h-[400px] rounded-2xl" />
            </div>
          </div>
        </main>
        <UploadFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <DashboardHeader
          datasetName={data.datasetName}
          domain={activeDomain}
        />

        <StatsGrid stats={data.stats} />

        <ChartGallery chartsData={data.charts} />

        <AdvancedAnalysis 
          matrix={data.advanced.matrix}
          labels={data.advanced.labels}
          regression={data.advanced.regression}
        />

        <InsightsReport 
           executiveSummary={data.insights.executiveSummary}
           items={data.insights.items}
        />

        <ExportControls />
      </main>

      <UploadFooter />
    </div>
  );
}
