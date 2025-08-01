"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { ReportsTable } from "@/components/dashboard/reports-table";
import { Report } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch("/api/reports");
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReports();
  }, []);

  const pendingReports = reports.filter(
    (report) => report.status === "new" || report.status === "in_review"
  ).length;

  if (isLoading) {
    return (
      <main className="container mx-auto py-6 space-y-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-6"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-muted rounded mt-8"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-6 space-y-8">
      <DashboardHeader
        totalReports={reports.length}
        pendingReports={pendingReports}
      />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        <ReportsTable reports={reports} />
      </div>
    </main>
  );
}
