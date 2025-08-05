import fs from "fs";
import path from "path";
import { PsychologistResponse, Report, ReportStatus } from "@/types";

const DB_DIR = path.join(process.cwd(), "data", "db");

// Ensure the database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const RESPONSES_FILE = path.join(DB_DIR, "responses.json");
const REPORTS_FILE = path.join(DB_DIR, "reports.json");

// Initialize files if they don't exist
if (!fs.existsSync(RESPONSES_FILE)) {
  fs.writeFileSync(RESPONSES_FILE, "[]");
}

if (!fs.existsSync(REPORTS_FILE)) {
  // Copy mock data to reports.json
  const { mockReports } = require("@/data/mock-data");
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(mockReports, null, 2));
}

export function getAllResponses(): PsychologistResponse[] {
  const data = fs.readFileSync(RESPONSES_FILE, "utf-8");
  return JSON.parse(data);
}

export function getAllReports(): Report[] {
  const data = fs.readFileSync(REPORTS_FILE, "utf-8");
  return JSON.parse(data);
}

export function getResponsesByReportId(reportId: string): PsychologistResponse[] {
  const responses = getAllResponses();
  return responses.filter((response) => response.report_id === reportId);
}

export function saveResponse(response: PsychologistResponse) {
  const responses = getAllResponses();
  responses.push(response);
  fs.writeFileSync(RESPONSES_FILE, JSON.stringify(responses, null, 2));
  return response;
}

export function updateResponse(
  reportId: string,
  psychologistId: string,
  updates: Partial<PsychologistResponse>
) {
  const responses = getAllResponses();
  const index = responses.findIndex(
    (r) => r.report_id === reportId && r.psychologist_id === psychologistId
  );

  if (index === -1) {
    throw new Error("Response not found");
  }

  responses[index] = { ...responses[index], ...updates };
  fs.writeFileSync(RESPONSES_FILE, JSON.stringify(responses, null, 2));
  return responses[index];
}

export function updateReportStatus(reportId: string, status: ReportStatus) {
  const reports = getAllReports();
  const index = reports.findIndex((r) => r.id === reportId);

  if (index === -1) {
    throw new Error("Report not found");
  }

  reports[index].status = status;
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));
  return reports[index];
}

export function getReportById(reportId: string): Report | undefined {
  const reports = getAllReports();
  return reports.find((r) => r.id === reportId);
} 