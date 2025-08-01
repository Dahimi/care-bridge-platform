import { ReportDetailsSkeleton } from "@/components/ui/loading-skeleton";

export default function ReportLoading() {
  return (
    <main className="container mx-auto py-6">
      <ReportDetailsSkeleton />
    </main>
  );
} 