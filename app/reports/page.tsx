"use client";

import { ReportsTable } from "@/components/dashboard/reports-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Report } from "@/types";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
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

  const filteredReports = reports.filter((report) => {
    // Search filter
    const searchMatch =
      searchQuery === "" ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.child_info.location
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    // Status filter
    const statusMatch =
      statusFilter === "all" || report.status === statusFilter;

    // Severity filter
    let severityMatch = true;
    if (severityFilter !== "all") {
      const score = report.assessment_data.severity_score;
      switch (severityFilter) {
        case "high":
          severityMatch = score >= 7;
          break;
        case "medium":
          severityMatch = score >= 4 && score <= 6;
          break;
        case "low":
          severityMatch = score <= 3;
          break;
      }
    }

    return searchMatch && statusMatch && severityMatch;
  });

  if (isLoading) {
    return (
      <main className="container mx-auto py-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-6"></div>
          <div className="h-32 bg-muted rounded mb-6"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">All Reports</h1>
      </div>

      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Search Reports
            </label>
            <Input
              placeholder="Search by ID, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Severity Score
            </label>
            <Select
              value={severityFilter}
              onValueChange={(value) => setSeverityFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scores</SelectItem>
                <SelectItem value="high">High (7-10)</SelectItem>
                <SelectItem value="medium">Medium (4-6)</SelectItem>
                <SelectItem value="low">Low (1-3)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <ReportsTable reports={filteredReports} />
    </main>
  );
} 