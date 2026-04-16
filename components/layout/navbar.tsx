"use client";

import React from "react";
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">
            StatSpher
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/upload"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Upload
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            History
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 rounded-full bg-secondary ring-2 ring-border overflow-hidden">
            <div className="h-full w-full flex items-center justify-center text-xs font-semibold text-muted-foreground uppercase">
              JD
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
