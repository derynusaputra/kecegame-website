import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import React from "react";
export const metadata = {
  title: "Next.js Basic Table | KeceGame - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for KeceGame  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function ConnectionPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Connection" />
      <div className="space-y-6">
        <ComponentCard title="Connection">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
