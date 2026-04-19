import React, { Suspense } from "react";
import DashboardPage from "@/components/page-views/dashboard-view";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Analytics...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
