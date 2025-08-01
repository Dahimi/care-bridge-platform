import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Report } from "@/types";
import { format } from "date-fns";

interface ReportsTableProps {
  reports: Report[];
}

export function ReportsTable({ reports }: ReportsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.id}</TableCell>
              <TableCell>{report.child_info.location}</TableCell>
              <TableCell>{report.child_info.age}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    report.assessment_data.severity_score >= 7
                      ? "destructive"
                      : report.assessment_data.severity_score >= 5
                      ? "warning"
                      : "default"
                  }
                >
                  {report.assessment_data.severity_score}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    report.status === "new"
                      ? "default"
                      : report.status === "in_review"
                      ? "secondary"
                      : "success"
                  }
                >
                  {report.status}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(report.created_at), "MMM d, yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 