"use client";

import React, { useState } from "react";
import { Download, FileText, FileCode, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardData } from "@/lib/mock-dashboard-data";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ExportControlsProps {
  data: DashboardData;
  domain: string;
}

export const ExportControls = ({ data, domain }: ExportControlsProps) => {
  const [exporting, setExporting] = useState<"none" | "pdf" | "csv">("none");
  const [success, setSuccess] = useState<"none" | "pdf" | "csv">("none");

  const handleCSVExport = () => {
    setExporting("csv");
    
    try {
      // 1. Prepare CSV Header
      const headers = ["Metric", "Value"];
      const rows = [
        ["Dataset Name", data.datasetName],
        ["Domain", domain],
        ["Analysis Date", new Date().toLocaleDateString()],
        [], // empty row for separator
        ["SUMMARY STATISTICS", ""],
      ];

      // 2. Add Stats
      data.stats.forEach(stat => {
        rows.push([stat.label, stat.value]);
      });

      rows.push([], ["DISTRIBUTION DATA", ""]);
      
      // 3. Add Charts Data (mapped from bar chart)
      data.charts.bar.forEach(item => {
        rows.push([item.name, item.value.toString()]);
      });

      // 4. Convert to CSV String
      const csvContent = "data:text/csv;charset=utf-8," 
        + rows.map(e => e.join(",")).join("\n");

      // 5. Trigger Download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `StatSphere_${domain}_Analysis.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccess("csv");
      setTimeout(() => setSuccess("none"), 3000);
    } catch (error) {
      console.error("CSV Export failed:", error);
    } finally {
      setExporting("none");
    }
  };

  const handlePDFExport = async () => {
    setExporting("pdf");
    const element = document.getElementById("dashboard-content");
    
    if (!element) {
      setExporting("none");
      return;
    }

    // --- Safe Capture Mode: CSS Override ---
    // html2canvas fails on oklch/lab colors. We temporarily inject 
    // standard HEX overrides for the capture duration.
    const style = document.createElement("style");
    style.innerHTML = `
      #dashboard-content, #dashboard-content * {
        background-color: #ffffff !important;
        color: #1a1a1a !important;
        border-color: #e5e7eb !important;
        fill: #1a1a1a !important;
        stroke: #e5e7eb !important;
        background-image: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
      .recharts-cartesian-grid-horizontal line,
      .recharts-cartesian-grid-vertical line {
        stroke: #f3f4f6 !important;
      }
      .recharts-bar-rectangle path {
        fill: #000000 !important;
      }
      .recharts-area-path {
        fill: #cccccc !important;
        stroke: #000000 !important;
      }
    `;
    document.head.appendChild(style);

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        // Ignore elements that might still cause issues
        ignoreElements: (el) => el.classList.contains("framer-motion-container")
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`StatSphere_${domain}_Report.pdf`);

      setSuccess("pdf");
      setTimeout(() => setSuccess("none"), 3000);
    } catch (error) {
      console.error("PDF Export failed:", error);
    } finally {
      document.head.removeChild(style); // Cleanup
      setExporting("none");
    }
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
          onClick={handlePDFExport}
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
          onClick={handleCSVExport}
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

      <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-3xl -translate-y-20 translate-x-20" />
      <div className="absolute bottom-0 left-0 h-40 w-40 bg-primary/5 rounded-full blur-3xl translate-y-20 -translate-x-20" />
    </div>
  );
};
