import { supabase } from './supabase'
import { Report, PsychologistResponse, ReportStatus } from '@/types'

// Reports functions
export async function getAllReports(): Promise<Report[]> {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reports:', error)
    throw new Error('Failed to fetch reports')
  }

  return data || []
}

export async function getReportById(id: string): Promise<Report | null> {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // Report not found
    }
    console.error('Error fetching report:', error)
    throw new Error('Failed to fetch report')
  }

  return data
}

export async function createReport(report: Omit<Report, 'id' | 'created_at'>): Promise<Report> {
  const { data, error } = await supabase
    .from('reports')
    .insert({
      ...report,
      status: 'new' as ReportStatus,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating report:', error)
    throw new Error('Failed to create report')
  }

  return data
}

export async function updateReportStatus(id: string, status: ReportStatus): Promise<Report> {
  const { data, error } = await supabase
    .from('reports')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating report status:', error)
    throw new Error('Failed to update report status')
  }

  return data
}

export async function updateReportMedia(
  id: string, 
  mediaType: 'drawings' | 'photos' | 'audio_recordings',
  urls: string[]
): Promise<Report> {
  // First get the current report
  const report = await getReportById(id)
  if (!report) {
    throw new Error('Report not found')
  }

  // Update the media attachments
  const updatedMedia = {
    ...report.media_attachments,
    [mediaType]: [...report.media_attachments[mediaType], ...urls]
  }

  const { data, error } = await supabase
    .from('reports')
    .update({ 
      media_attachments: updatedMedia,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating report media:', error)
    throw new Error('Failed to update report media')
  }

  return data
}

// Responses functions
export async function getAllResponses(): Promise<PsychologistResponse[]> {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .order('response_date', { ascending: false })

  if (error) {
    console.error('Error fetching responses:', error)
    throw new Error('Failed to fetch responses')
  }

  return data || []
}

export async function getResponsesByReportId(reportId: string): Promise<PsychologistResponse[]> {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('report_id', reportId)
    .order('response_date', { ascending: false })

  if (error) {
    console.error('Error fetching responses:', error)
    throw new Error('Failed to fetch responses')
  }

  return data || []
}

export async function saveResponse(response: Omit<PsychologistResponse, 'id'>): Promise<PsychologistResponse> {
  const { data, error } = await supabase
    .from('responses')
    .insert({
      ...response,
      response_date: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving response:', error)
    throw new Error('Failed to save response')
  }

  return data
}

export async function updateResponse(
  reportId: string,
  psychologistId: string,
  updates: Partial<PsychologistResponse>
): Promise<PsychologistResponse> {
  const { data, error } = await supabase
    .from('responses')
    .update({
      ...updates,
      response_date: new Date().toISOString(),
    })
    .eq('report_id', reportId)
    .eq('psychologist_id', psychologistId)
    .select()
    .single()

  if (error) {
    console.error('Error updating response:', error)
    throw new Error('Failed to update response')
  }

  return data
}

// Real-time subscription for mobile apps to track report updates
export function subscribeToReportUpdates(
  reportId: string,
  callback: (report: Report) => void
) {
  return supabase
    .channel(`report-${reportId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'reports',
        filter: `id=eq.${reportId}`,
      },
      (payload) => {
        callback(payload.new as Report)
      }
    )
    .subscribe()
}

// Subscribe to all report changes (for dashboard)
export function subscribeToAllReports(callback: (report: Report) => void) {
  return supabase
    .channel('all-reports')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'reports',
      },
      (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          callback(payload.new as Report)
        }
      }
    )
    .subscribe()
} 