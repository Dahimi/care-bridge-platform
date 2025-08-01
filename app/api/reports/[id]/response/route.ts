import { NextResponse } from "next/server";
import { PsychologistResponse } from "@/types";
import {
  getResponsesByReportId,
  saveResponse,
  updateResponse,
} from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response: Partial<PsychologistResponse> = await request.json();
    
    // In a real app, this would come from auth
    const psychologistId = "psy_temp";

    const newResponse: PsychologistResponse = {
      report_id: params.id,
      psychologist_id: psychologistId,
      response_date: new Date().toISOString(),
      ...response,
    } as PsychologistResponse;

    const savedResponse = saveResponse(newResponse);
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
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const psychologistId = "psy_temp"; // In real app, this would come from auth

    const existingResponses = getResponsesByReportId(params.id);
    const existingResponse = existingResponses.find(
      (r) => r.psychologist_id === psychologistId
    );

    if (!existingResponse) {
      return NextResponse.json(
        { error: "Response not found" },
        { status: 404 }
      );
    }

    const updatedResponse = updateResponse(params.id, psychologistId, {
      ...updates,
      response_date: new Date().toISOString(),
    });

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
  { params }: { params: { id: string } }
) {
  try {
    const responses = getResponsesByReportId(params.id);
    return NextResponse.json(responses);
  } catch (error) {
    console.error("Failed to fetch responses:", error);
    return NextResponse.json(
      { error: "Failed to fetch responses" },
      { status: 500 }
    );
  }
} 