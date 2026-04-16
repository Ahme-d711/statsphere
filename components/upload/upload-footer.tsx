"use client";

import React from "react";

export const UploadFooter = () => {
  return (
    <footer className="py-8 border-t border-border/40">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Statify Analytics. All rights reserved.
      </div>
    </footer>
  );
};
