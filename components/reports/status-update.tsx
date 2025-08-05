"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ReportStatus } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface StatusUpdateProps {
  reportId: string;
  currentStatus: ReportStatus;
}

export function StatusUpdate({ reportId, currentStatus }: StatusUpdateProps) {
  const [newStatus, setNewStatus] = useState<ReportStatus>(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async () => {
    if (newStatus === currentStatus) {
      toast.info("Status unchanged");
      return;
    }

    try {
      setIsUpdating(true);
      
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      toast.success("Status updated successfully");
      router.refresh(); // Refresh the page to show updated status
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
      setNewStatus(currentStatus); // Reset to original status
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Update Report Status</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Current Status: 
            <span className={`ml-2 px-2 py-1 rounded text-xs ${
              currentStatus === "new" 
                ? "bg-blue-100 text-blue-800" 
                : currentStatus === "in_review"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}>
              {currentStatus}
            </span>
          </label>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">New Status</label>
          <Select
            value={newStatus}
            onValueChange={(value) => setNewStatus(value as ReportStatus)}
            disabled={isUpdating}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleStatusUpdate} 
          disabled={isUpdating || newStatus === currentStatus}
          className="w-full"
        >
          {isUpdating ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </Card>
  );
} 