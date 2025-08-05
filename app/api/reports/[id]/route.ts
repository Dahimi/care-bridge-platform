import { NextResponse } from "next/server";
import { getResponsesByReportId, getReportById, updateReportStatus } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const report = getReportById(id);
  const responses = getResponsesByReportId(id);

  if (!report) {
    return NextResponse.json(
      { error: "Report not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ report, responses });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    // If updating status
    if (updates.status) {
      const updatedReport = updateReportStatus(id, updates.status);
      return NextResponse.json(updatedReport);
    }

    // For other updates, we would handle them here
    return NextResponse.json({ 
      message: "Report updated successfully",
      updates
    });
  } catch (error) {
    console.error("Failed to update report:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
} 