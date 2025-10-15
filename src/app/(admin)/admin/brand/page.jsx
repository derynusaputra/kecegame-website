import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import MainBrand from "./_component/MainBrand";
import { Button } from "@/components/ui/button";
export const metadata = {
  title: "Next.js Basic Table | KeceGame - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for KeceGame  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function ConnectionPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Brand" />
      <div className="space-y-6">
        <MainBrand />
      </div>
    </div>
  );
}
