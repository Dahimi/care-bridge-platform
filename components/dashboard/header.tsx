import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Report } from "@/types";
import { ClipboardList, Users } from "lucide-react";

interface DashboardHeaderProps {
  totalReports: number;
  pendingReports: number;
}

export function DashboardHeader({
  totalReports,
  pendingReports,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          View All Cases
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Total Reports</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">{totalReports}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Pending Reviews</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">{pendingReports}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Completed Today</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">0</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Urgent Cases</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">2</p>
        </Card>
      </div>
    </div>
  );
} 