import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAllReports } from "@/lib/db";

const MEDIA_DIR = path.join(process.cwd(), "public", "media");
const REPORTS_FILE = path.join(process.cwd(), "data", "db", "reports.json");

// Ensure media directory exists
if (!fs.existsSync(MEDIA_DIR)) {
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");
    const type = formData.get("type") as "drawings" | "photos" | "audio_recordings";

    if (!files.length) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    if (!type || !["drawings", "photos", "audio_recordings"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid media type" },
        { status: 400 }
      );
    }

    // Find the report
    const reports = getAllReports();
    const reportIndex = reports.findIndex((r) => r.id === params.id);

    if (reportIndex === -1) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    const mediaUrls: string[] = [];

    // Process each file
    for (const file of files) {
      if (!(file instanceof File)) {
        continue;
      }

      // Create a unique filename
      const timestamp = Date.now();
      const filename = `${params.id}_${timestamp}_${file.name}`;
      const mediaPath = path.join(MEDIA_DIR, filename);
      
      // Convert File to Buffer and save
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(mediaPath, buffer);

      // Generate public URL
      const mediaUrl = `/media/${filename}`;
      mediaUrls.push(mediaUrl);
    }

    // Update report with new media URLs
    reports[reportIndex].media_attachments[type] = [
      ...reports[reportIndex].media_attachments[type],
      ...mediaUrls,
    ];

    // Save updated reports
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));

    return NextResponse.json({ 
      message: "Media files uploaded successfully",
      urls: mediaUrls 
    });
  } catch (error) {
    console.error("Failed to upload media:", error);
    return NextResponse.json(
      { error: "Failed to upload media" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reports = getAllReports();
    const report = reports.find((r) => r.id === params.id);

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(report.media_attachments);
  } catch (error) {
    console.error("Failed to fetch media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
} 