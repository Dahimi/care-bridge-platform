import { NextResponse } from "next/server";
import { PsychologistResponse } from "@/types";
import {
  getResponsesByReportId,
  saveResponse,
  updateResponse,
} from "@/lib/supabase-db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response: Partial<PsychologistResponse> = await request.json();
    
    // In a real app, this would come from auth
    const psychologistId = "psy_temp";

    const responseData = {
      report_id: id,
      psychologist_id: psychologistId,
      ...response,
    } as Omit<PsychologistResponse, 'id'>;

    const savedResponse = await saveResponse(responseData);
    return NextResponse.json(savedResponse, { status: 201 });
  } catch (error) {
    console.error("Failed to submit response:", error);
    return NextResponse.json(
      { error: "Failed to submit response" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();
    const psychologistId = "psy_temp"; // In real app, this would come from auth

    const existingResponses = await getResponsesByReportId(id);
    const existingResponse = existingResponses.find(
      (r) => r.psychologist_id === psychologistId
    );

    if (!existingResponse) {
      return NextResponse.json(
        { error: "Response not found" },
        { status: 404 }
      );
    }

    const updatedResponse = await updateResponse(id, psychologistId, updates);

    return NextResponse.json(updatedResponse);
  } catch (error) {
    console.error("Failed to update response:", error);
    return NextResponse.json(
      { error: "Failed to update response" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const responses = await getResponsesByReportId(id);
    return NextResponse.json(responses);
  } catch (error) {
    console.error("Failed to fetch responses:", error);
    return NextResponse.json(
      { error: "Failed to fetch responses" },
      { status: 500 }
    );
  }
} 