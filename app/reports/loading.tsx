import { CardSkeleton, TableRowSkeleton } from "@/components/ui/loading-skeleton";
import { Card } from "@/components/ui/card";

export default function ReportsLoading() {
  return (
    <main className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">All Reports</h1>
      </div>

      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="h-6 mb-2" /> {/* Label space */}
              <CardSkeleton />
            </div>
          ))}
        </div>
      </Card>

      <div className="rounded-md border p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </div>
    </main>
  );
} 