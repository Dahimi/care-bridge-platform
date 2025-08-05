import { NextResponse } from "next/server";
import { getAllReports, createReport } from "@/lib/supabase-db";

export async function GET() {
  try {
    const reports = await getAllReports();
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
    const reportData = await request.json();
    
    // Validate mobile_app_id
    if (!reportData.mobile_app_id) {
      return NextResponse.json(
        { error: "mobile_app_id is required" },
        { status: 400 }
      );
    }

    // Create the report using Supabase
    const report = await createReport(reportData);

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Failed to create report:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
} 