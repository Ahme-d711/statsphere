"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Cog, LucideIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const MODULES: Module[] = [
  {
    id: "medical",
    title: "Medical Analysis",
    description:
      "Tailored for clinical trials, patient data, and healthcare metrics.",
    icon: Stethoscope,
  },
  {
    id: "engineering",
    title: "Engineering Analysis",
    description:
      "Optimized for mechanical data, stress tests, and process optimization.",
    icon: Cog,
  },
];

interface ModuleSelectorProps {
  selectedModule: string | null;
  onSelect: (id: string) => void;
}

export const ModuleSelector = ({
  selectedModule,
  onSelect,
}: ModuleSelectorProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6 text-foreground flex items-center gap-2">
        Choose Analysis Domain
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODULES.map((module) => {
          const isSelected = selectedModule === module.id;
          const Icon = module.icon;

          return (
            <motion.div
              key={module.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative cursor-pointer"
              onClick={() => onSelect(module.id)}
            >
              <Card
                className={cn(
                  "transition-all duration-300 rounded-2xl border-2 overflow-hidden",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                    : "border-muted-foreground/10 bg-card hover:border-primary/20 hover:bg-accent/40"
                )}
              >
                <CardContent className="p-8 flex items-start gap-4">
                  <div
                    className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-primary"
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="space-y-1 pr-8">
                    <h3 className="text-lg font-bold text-foreground">
                      {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-4 right-4 text-primary"
                >
                  <CheckCircle2 className="h-6 w-6 fill-primary text-white" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
