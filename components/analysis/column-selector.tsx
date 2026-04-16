"use client";

import React from "react";
import Select, { MultiValue, StylesConfig } from "react-select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ListFilter } from "lucide-react";

interface ColumnOption {
  value: string;
  label: string;
}

interface ColumnSelectorProps {
  options: string[];
  selectedColumns: string[];
  onChange: (selected: string[]) => void;
}

export const ColumnSelector = ({
  options,
  selectedColumns,
  onChange,
}: ColumnSelectorProps) => {
  const selectOptions: ColumnOption[] = options.map((opt) => ({
    value: opt,
    label: opt,
  }));

  const value = selectOptions.filter((opt) => selectedColumns.includes(opt.value));

  const handleChange = (newValue: MultiValue<ColumnOption>) => {
    onChange(newValue.map((v) => v.value));
  };

  const customStyles: StylesConfig<ColumnOption, true> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      borderColor: state.isFocused ? "var(--primary)" : "var(--border)",
      borderRadius: "0.75rem",
      padding: "2px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "var(--primary)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "0.75rem",
      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      overflow: "hidden",
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "var(--primary)" : "transparent",
      color: state.isFocused ? "var(--primary-foreground)" : "var(--foreground)",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "var(--primary)",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "var(--primary)",
      borderRadius: "0.5rem",
      color: "var(--primary-foreground)",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "var(--primary-foreground)",
      padding: "2px 6px",
      fontWeight: "500",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "var(--primary-foreground)",
      borderRadius: "0.5rem",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        color: "white",
      },
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm shadow-xl shadow-primary/5 border-muted-foreground/10 rounded-2xl overflow-visible mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <ListFilter className="h-5 w-5 text-primary" />
          Filter Columns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Select specific columns to include in your analysis. If none are
          selected, all columns will be processed by default.
        </p>
        <Select
          isMulti
          options={selectOptions}
          value={value}
          onChange={handleChange}
          styles={customStyles}
          menuPortalTarget={typeof document !== "undefined" ? document.body : null}
          menuPosition="fixed"
          placeholder="Search columns..."
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </CardContent>
    </Card>
  );
};
