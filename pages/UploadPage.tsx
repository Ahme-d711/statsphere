"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { UploadHeader } from "@/components/upload/upload-header";
import { UploadCard } from "@/components/upload/upload-card";
import { DataPreview } from "@/components/upload/data-preview";
import { AnalyzeButton } from "@/components/upload/analyze-button";
import { UploadFooter } from "@/components/upload/upload-footer";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isParsing, setIsParsing] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setIsParsing(true);

    const reader = new FileReader();

    if (file.name.endsWith(".csv")) {
      reader.onload = (e) => {
        const text = e.target?.result as string;
        Papa.parse(text, {
          header: true,
          preview: 10,
          complete: (results) => {
            setParsedData(results.data);
            if (results.data.length > 0) {
              setColumns(Object.keys(results.data[0] as Record<string, unknown>));
            }
            setIsParsing(false);
          },
        });
      };
      reader.readAsText(file);
    } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length > 0) {
          const headers = jsonData[0] as string[];
          const rows = jsonData.slice(1, 11).map((row: any) => {
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header] = row[index];
            });
            return obj;
          });
          setColumns(headers);
          setParsedData(rows);
        }
        setIsParsing(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setParsedData([]);
    setColumns([]);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16 md:py-24">
        <UploadHeader />

        <UploadCard
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          isUploading={isParsing}
        />

        <AnimatePresence>
          {isParsing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mt-12"
            >
              <div className="flex items-center gap-3 text-primary font-medium">
                <Loader2 className="h-5 w-5 animate-spin" />
                Parsing your data...
              </div>
            </motion.div>
          )}

          {!isParsing && selectedFile && parsedData.length > 0 && (
            <>
              <DataPreview data={parsedData} columns={columns} />
              <AnalyzeButton />
            </>
          )}
        </AnimatePresence>
      </main>

      <UploadFooter />
    </div>
  );
}
