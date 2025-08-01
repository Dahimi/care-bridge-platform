import { NextResponse } from "next/server";
import { mockReports } from "@/data/mock-data";
import { Report } from "@/types";

export async function GET() {
  return NextResponse.json(mockReports);
}

export async function POST(request: Request) {
  const report: Report = await request.json();
  
  // In a real app, we would save this to a database
  // For now, we'll just return the report with a success message
  return NextResponse.json({ 
    message: "Report created successfully", 
    report 
  }, { status: 201 });
} 