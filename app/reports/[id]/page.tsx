import { mockReports, mockResponses } from "@/data/mock-data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { AlertTriangle, Calendar, MapPin, User } from "lucide-react";
import { ReportResponseForm } from "@/components/reports/response-form";
import { MediaGallery } from "@/components/reports/media-gallery";

interface ReportPageProps {
  params: {
    id: string;
  };
}

export default function ReportPage({ params }: ReportPageProps) {
  const report = mockReports.find((r) => r.id === params.id);
  const response = mockResponses.find((r) => r.report_id === params.id);

  if (!report) {
    notFound();
  }

  return (
    <main className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Report Details</h1>
          <p className="text-muted-foreground">
            Created {format(new Date(report.created_at), "PPP")}
          </p>
        </div>
        <Badge
          variant={
            report.status === "new"
              ? "default"
              : report.status === "in_review"
              ? "secondary"
              : "success"
          }
          className="text-sm"
        >
          {report.status}
        </Badge>
      </div>

      {/* Quick Info Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">Age</p>
          </div>
          <p className="mt-1 text-2xl font-bold">{report.child_info.age}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">Location</p>
          </div>
          <p className="mt-1 text-2xl font-bold">{report.child_info.location}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">Severity Score</p>
          </div>
          <p className="mt-1 text-2xl font-bold">
            {report.assessment_data.severity_score}/10
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">Gender</p>
          </div>
          <p className="mt-1 text-2xl font-bold">{report.child_info.gender}</p>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="assessment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Parent Observations</h2>
            <p className="text-muted-foreground">
              {report.assessment_data.parent_observations}
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">AI Analysis</h2>
            <p className="text-muted-foreground">
              {report.assessment_data.ai_analysis}
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Risk Indicators</h2>
            <div className="flex gap-2 flex-wrap">
              {report.assessment_data.risk_indicators.map((risk) => (
                <Badge key={risk} variant="secondary">
                  {risk}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cultural Context</h2>
            <p className="text-muted-foreground">
              {report.assessment_data.cultural_context}
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <MediaGallery media={report.media_attachments} />
        </TabsContent>

        <TabsContent value="response">
          <ReportResponseForm reportId={report.id} existingResponse={response} />
        </TabsContent>
      </Tabs>
    </main>
  );
} 