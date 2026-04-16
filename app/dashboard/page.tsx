import React, { Suspense } from "react";
import DashboardPage from "@/pages/DashboardPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Analytics...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
