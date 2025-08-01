import { NextResponse } from "next/server";
import { Report } from "@/types";
import fs from "fs";
import path from "path";
import { getAllReports } from "@/lib/db";

const REPORTS_FILE = path.join(process.cwd(), "data", "db", "reports.json");

export async function GET() {
  try {
    const reports = getAllReports();
    return NextResponse.json(reports);
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const report: Report = await request.json();
    
    // Validate mobile_app_id
    if (!report.mobile_app_id) {
      return NextResponse.json(
        { error: "mobile_app_id is required" },
        { status: 400 }
      );
    }

    // Generate a unique ID for the report
    report.id = `report_${Date.now()}`;
    report.created_at = new Date().toISOString();
    report.status = "new";

    // Save the report
    const reports = getAllReports();
    reports.push(report);
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Failed to create report:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
} 