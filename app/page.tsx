import { DashboardHeader } from "@/components/dashboard/header";
import { ReportsTable } from "@/components/dashboard/reports-table";
import { mockReports } from "@/data/mock-data";

export default function Home() {
  const pendingReports = mockReports.filter(
    (report) => report.status === "new" || report.status === "in_review"
  ).length;

  return (
    <main className="container mx-auto py-6 space-y-8">
      <DashboardHeader
        totalReports={mockReports.length}
        pendingReports={pendingReports}
      />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        <ReportsTable reports={mockReports} />
      </div>
    </main>
  );
}
