import { NextResponse } from "next/server";
import { mockReports, mockResponses } from "@/data/mock-data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const report = mockReports.find((r) => r.id === params.id);
  const responses = mockResponses.filter((r) => r.report_id === params.id);

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
  { params }: { params: { id: string } }
) {
  const updates = await request.json();
  const reportIndex = mockReports.findIndex((r) => r.id === params.id);

  if (reportIndex === -1) {
    return NextResponse.json(
      { error: "Report not found" },
      { status: 404 }
    );
  }

  // In a real app, we would update the database
  // For now, we'll just return success
  return NextResponse.json({ 
    message: "Report updated successfully",
    updates
  });
} 