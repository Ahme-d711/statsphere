"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, CheckCircle2, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadCardProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile: File | null;
  isUploading?: boolean;
}

export const UploadCard = ({
  onFileSelect,
  onFileRemove,
  selectedFile,
  isUploading = false,
}: UploadCardProps) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      if (fileRejections.length > 0) {
        setError("Please upload only CSV or XLSX files.");
        return;
      }
      setError(null);
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="border-2 border-dashed border-muted-foreground/20 bg-card/50 backdrop-blur shadow-xl shadow-primary/5 rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            {!selectedFile ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <div
                  {...getRootProps()}
                  className={cn(
                    "flex flex-col items-center justify-center py-16 px-6 cursor-pointer transition-all duration-300",
                    isDragActive
                      ? "bg-primary/5 border-primary/40"
                      : "hover:bg-accent/40"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="mb-6 relative">
                    <motion.div
                      animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                      className={cn(
                        "h-20 w-20 rounded-2xl flex items-center justify-center transition-colors shadow-lg",
                        isDragActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-primary"
                      )}
                    >
                      <Upload className="h-10 w-10" />
                    </motion.div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Drag & Drop your file here
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      or click to browse from your computer
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <Badge variant="secondary" className="px-3 py-1 rounded-full">CSV</Badge>
                      <Badge variant="secondary" className="px-3 py-1 rounded-full">XLSX</Badge>
                    </div>
                  </div>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex items-center gap-2 text-destructive text-sm font-medium"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="file-info"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-12 flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <FileText className="h-12 w-12" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary border-4 border-card flex items-center justify-center text-primary-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-1 truncate max-w-sm">
                  {selectedFile.name}
                </h3>
                <p className="text-muted-foreground mb-8">
                  {formatFileSize(selectedFile.size)} • {selectedFile.type || "Dataset"}
                </p>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="rounded-xl px-6 h-11 border-muted-foreground/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFileRemove();
                    }}
                    disabled={isUploading}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      
      <p className="mt-6 text-center text-sm text-muted-foreground/60 leading-tight">
        Your data is processed locally in the browser for privacy. <br />
        Maximum file size: 50MB.
      </p>
    </motion.div>
  );
};
