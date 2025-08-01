export type ChildInfo = {
  age: number;
  gender: string;
  location: string;
};

export type AssessmentData = {
  parent_observations: string;
  ai_analysis: string;
  severity_score: number;
  risk_indicators: string[];
  cultural_context: string;
};

export type MediaAttachments = {
  drawings: string[];
  audio_recordings: string[];
  photos: string[];
};

export type ReportStatus = "new" | "in_review" | "completed";

export type Report = {
  id: string;
  child_info: ChildInfo;
  assessment_data: AssessmentData;
  media_attachments: MediaAttachments;
  status: ReportStatus;
  created_at: string;
  mobile_app_id: string;
};

export type UrgencyLevel = "low" | "medium" | "high" | "critical";

export type PsychologistRecommendations = {
  immediate_actions: string;
  therapeutic_activities: string;
  follow_up_timeline: string;
  referral_suggestions: string;
};

export type PsychologistResponse = {
  report_id: string;
  psychologist_notes: string;
  recommendations: PsychologistRecommendations;
  urgency_level: UrgencyLevel;
  response_date: string;
  psychologist_id: string;
}; 