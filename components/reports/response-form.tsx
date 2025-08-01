"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { PsychologistResponse, UrgencyLevel } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  psychologist_notes: z.string().min(1, "Notes are required"),
  immediate_actions: z.string().min(1, "Immediate actions are required"),
  therapeutic_activities: z.string().min(1, "Therapeutic activities are required"),
  follow_up_timeline: z.string().min(1, "Follow-up timeline is required"),
  referral_suggestions: z.string(),
  urgency_level: z.enum(["low", "medium", "high", "critical"] as const),
});

interface ReportResponseFormProps {
  reportId: string;
  existingResponse?: PsychologistResponse;
}

export function ReportResponseForm({
  reportId,
  existingResponse,
}: ReportResponseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      psychologist_notes: existingResponse?.psychologist_notes || "",
      immediate_actions: existingResponse?.recommendations.immediate_actions || "",
      therapeutic_activities:
        existingResponse?.recommendations.therapeutic_activities || "",
      follow_up_timeline:
        existingResponse?.recommendations.follow_up_timeline || "",
      referral_suggestions:
        existingResponse?.recommendations.referral_suggestions || "",
      urgency_level: (existingResponse?.urgency_level as UrgencyLevel) || "low",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, we would send this to the API
    console.log(values);
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="urgency_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urgency Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="psychologist_notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Assessment Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your professional assessment..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="immediate_actions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Immediate Actions Required</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List immediate actions needed..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="therapeutic_activities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recommended Therapeutic Activities</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Suggest therapeutic activities..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="follow_up_timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Follow-up Timeline</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Weekly check-ins for first month"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referral_suggestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referral Suggestions (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Suggest professional referrals if needed..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {existingResponse ? "Update Response" : "Submit Response"}
          </Button>
        </form>
      </Form>
    </Card>
  );
} 