import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types for our database tables
export type Database = {
  public: {
    Tables: {
      reports: {
        Row: {
          id: string
          child_info: {
            age: number
            gender: string
            location: string
          }
          assessment_data: {
            parent_observations: string
            ai_analysis: string
            severity_score: number
            risk_indicators: string[]
            cultural_context: string
          }
          media_attachments: {
            drawings: string[]
            audio_recordings: string[]
            photos: string[]
          }
          status: 'new' | 'in_review' | 'completed'
          created_at: string
          updated_at: string
          mobile_app_id: string
        }
        Insert: {
          id?: string
          child_info: {
            age: number
            gender: string
            location: string
          }
          assessment_data: {
            parent_observations: string
            ai_analysis: string
            severity_score: number
            risk_indicators: string[]
            cultural_context: string
          }
          media_attachments: {
            drawings: string[]
            audio_recordings: string[]
            photos: string[]
          }
          status?: 'new' | 'in_review' | 'completed'
          created_at?: string
          updated_at?: string
          mobile_app_id: string
        }
        Update: {
          id?: string
          child_info?: {
            age: number
            gender: string
            location: string
          }
          assessment_data?: {
            parent_observations: string
            ai_analysis: string
            severity_score: number
            risk_indicators: string[]
            cultural_context: string
          }
          media_attachments?: {
            drawings: string[]
            audio_recordings: string[]
            photos: string[]
          }
          status?: 'new' | 'in_review' | 'completed'
          created_at?: string
          updated_at?: string
          mobile_app_id?: string
        }
      }
      responses: {
        Row: {
          id: string
          report_id: string
          psychologist_notes: string
          recommendations: {
            immediate_actions: string
            therapeutic_activities: string
            follow_up_timeline: string
            referral_suggestions: string
          }
          urgency_level: 'low' | 'medium' | 'high' | 'critical'
          response_date: string
          psychologist_id: string
        }
        Insert: {
          id?: string
          report_id: string
          psychologist_notes: string
          recommendations: {
            immediate_actions: string
            therapeutic_activities: string
            follow_up_timeline: string
            referral_suggestions: string
          }
          urgency_level: 'low' | 'medium' | 'high' | 'critical'
          response_date?: string
          psychologist_id: string
        }
        Update: {
          id?: string
          report_id?: string
          psychologist_notes?: string
          recommendations?: {
            immediate_actions: string
            therapeutic_activities: string
            follow_up_timeline: string
            referral_suggestions: string
          }
          urgency_level?: 'low' | 'medium' | 'high' | 'critical'
          response_date?: string
          psychologist_id?: string
        }
      }
    }
  }
} 