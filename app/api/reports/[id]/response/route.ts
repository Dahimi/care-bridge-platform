import { NextResponse } from "next/server";
import { mockResponses } from "@/data/mock-data";
import { PsychologistResponse } from "@/types";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response: Partial<PsychologistResponse> = await request.json();
    
    // In a real app, we would save this to a database
    // For now, we'll simulate a delay and return success
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newResponse: PsychologistResponse = {
      report_id: params.id,
      psychologist_id: "psy_temp", // In real app, this would come from auth
      response_date: new Date().toISOString(),
      ...response,
    } as PsychologistResponse;

    return NextResponse.json(newResponse, { status: 201 });
  } catch (error) {
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
    const existingResponse = mockResponses.find(
      (r) => r.report_id === params.id
    );

    if (!existingResponse) {
      return NextResponse.json(
        { error: "Response not found" },
        { status: 404 }
      );
    }

    // In a real app, we would update the database
    // For now, we'll simulate a delay and return success
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedResponse = {
      ...existingResponse,
      ...updates,
      response_date: new Date().toISOString(),
    };

    return NextResponse.json(updatedResponse);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update response" },
      { status: 500 }
    );
  }
} 