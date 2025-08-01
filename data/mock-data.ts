import { Report, PsychologistResponse } from "@/types";

export const mockReports: Report[] = [
  {
    id: "report_001",
    child_info: {
      age: 8,
      gender: "female",
      location: "Gaza",
    },
    assessment_data: {
      parent_observations: "Child shows signs of anxiety and has trouble sleeping. Often startled by loud noises.",
      ai_analysis: "Initial analysis indicates symptoms consistent with acute stress response. Recommend immediate support for sleep issues and anxiety management.",
      severity_score: 7,
      risk_indicators: ["sleep disturbance", "heightened anxiety", "noise sensitivity"],
      cultural_context: "Recent exposure to conflict zone. Strong family support structure present.",
    },
    media_attachments: {
      drawings: ["/mock/drawing1.jpg", "/mock/drawing2.jpg"],
      audio_recordings: ["/mock/audio1.mp3"],
      photos: [],
    },
    status: "new",
    created_at: "2024-03-10T08:00:00Z",
    mobile_app_id: "mobile_001",
  },
  {
    id: "report_002",
    child_info: {
      age: 12,
      gender: "male",
      location: "Ukraine",
    },
    assessment_data: {
      parent_observations: "Withdrawn behavior, refusing to attend school. Expresses fear about future.",
      ai_analysis: "Shows signs of depression and social withdrawal. Educational disruption impact observed.",
      severity_score: 6,
      risk_indicators: ["social isolation", "educational disruption", "depression symptoms"],
      cultural_context: "Displaced from home region. Currently in temporary housing with extended family.",
    },
    media_attachments: {
      drawings: ["/mock/drawing3.jpg"],
      audio_recordings: [],
      photos: ["/mock/photo1.jpg"],
    },
    status: "in_review",
    created_at: "2024-03-09T15:30:00Z",
    mobile_app_id: "mobile_002",
  },
  {
    id: "report_003",
    child_info: {
      age: 6,
      gender: "female",
      location: "Sudan",
    },
    assessment_data: {
      parent_observations: "Frequent crying episodes, clingy behavior. Refuses to be separated from mother.",
      ai_analysis: "Presenting with separation anxiety and emotional dysregulation. Age-appropriate interventions recommended.",
      severity_score: 8,
      risk_indicators: ["separation anxiety", "emotional dysregulation", "attachment issues"],
      cultural_context: "Recent relocation to refugee camp. Limited access to educational resources.",
    },
    media_attachments: {
      drawings: ["/mock/drawing4.jpg", "/mock/drawing5.jpg"],
      audio_recordings: ["/mock/audio2.mp3"],
      photos: ["/mock/photo2.jpg"],
    },
    status: "completed",
    created_at: "2024-03-08T11:15:00Z",
    mobile_app_id: "mobile_003",
  },
];

export const mockResponses: PsychologistResponse[] = [
  {
    report_id: "report_003",
    psychologist_notes: "Child displays significant attachment-related trauma symptoms. Immediate intervention recommended for both child and caregiver support.",
    recommendations: {
      immediate_actions: "Establish daily routine with predictable separation and reunion patterns. Implement calming techniques for both child and mother.",
      therapeutic_activities: "Guided drawing sessions focusing on emotions. Simple breathing exercises suitable for age group.",
      follow_up_timeline: "Weekly check-ins for first month, then bi-weekly depending on progress.",
      referral_suggestions: "Local child trauma specialist if available in camp setting. Group therapy sessions for children with similar experiences.",
    },
    urgency_level: "high",
    response_date: "2024-03-09T14:20:00Z",
    psychologist_id: "psy_001",
  },
]; 