import BarChartOne from "@/components/charts/bar/BarChartOne";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
export const metadata = {
  title: "Next.js Bar Chart | KeceGame - Next.js Dashboard Template",
  description:
    "This is Next.js Bar Chart page for KeceGame - Next.js Tailwind CSS Admin Dashboard Template",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6">
        <ComponentCard title="Bar Chart 1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
