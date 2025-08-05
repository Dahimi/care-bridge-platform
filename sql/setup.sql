-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_info JSONB NOT NULL,
  assessment_data JSONB NOT NULL,
  media_attachments JSONB NOT NULL DEFAULT '{"drawings": [], "audio_recordings": [], "photos": []}',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  mobile_app_id TEXT NOT NULL
);

-- Create responses table
CREATE TABLE IF NOT EXISTS responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  psychologist_notes TEXT NOT NULL,
  recommendations JSONB NOT NULL,
  urgency_level TEXT NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high', 'critical')),
  response_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  psychologist_id TEXT NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_mobile_app_id ON reports(mobile_app_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at);
CREATE INDEX IF NOT EXISTS idx_responses_report_id ON responses(report_id);
CREATE INDEX IF NOT EXISTS idx_responses_psychologist_id ON responses(psychologist_id);

-- Enable Row Level Security (RLS)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can make these more restrictive later)
CREATE POLICY "Enable read access for all users" ON reports FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON reports FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON reports FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON responses FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON responses FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON responses FOR DELETE USING (true);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for reports table
CREATE TRIGGER update_reports_updated_at 
  BEFORE UPDATE ON reports 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO reports (
  child_info,
  assessment_data,
  media_attachments,
  status,
  mobile_app_id
) VALUES (
  '{"age": 8, "gender": "female", "location": "Gaza"}',
  '{"parent_observations": "Child shows signs of anxiety and has trouble sleeping. Often startled by loud noises.", "ai_analysis": "Initial analysis indicates symptoms consistent with acute stress response. Recommend immediate support for sleep issues and anxiety management.", "severity_score": 7, "risk_indicators": ["sleep disturbance", "heightened anxiety", "noise sensitivity"], "cultural_context": "Recent exposure to conflict zone. Strong family support structure present."}',
  '{"drawings": ["/mock/drawing1.jpg", "/mock/drawing2.jpg"], "audio_recordings": ["/mock/audio1.mp3"], "photos": []}',
  'new',
  'mobile_001'
),
(
  '{"age": 12, "gender": "male", "location": "Ukraine"}',
  '{"parent_observations": "Withdrawn behavior, refusing to attend school. Expresses fear about future.", "ai_analysis": "Shows signs of depression and social withdrawal. Educational disruption impact observed.", "severity_score": 6, "risk_indicators": ["social isolation", "educational disruption", "depression symptoms"], "cultural_context": "Displaced from home region. Currently in temporary housing with extended family."}',
  '{"drawings": ["/mock/drawing3.jpg"], "audio_recordings": [], "photos": ["/mock/photo1.jpg"]}',
  'in_review',
  'mobile_002'
),
(
  '{"age": 6, "gender": "female", "location": "Sudan"}',
  '{"parent_observations": "Frequent crying episodes, clingy behavior. Refuses to be separated from mother.", "ai_analysis": "Presenting with separation anxiety and emotional dysregulation. Age-appropriate interventions recommended.", "severity_score": 8, "risk_indicators": ["separation anxiety", "emotional dysregulation", "attachment issues"], "cultural_context": "Recent relocation to refugee camp. Limited access to educational resources."}',
  '{"drawings": ["/mock/drawing4.jpg", "/mock/drawing5.jpg"], "audio_recordings": ["/mock/audio2.mp3"], "photos": ["/mock/photo2.jpg"]}',
  'completed',
  'mobile_003'
) ON CONFLICT DO NOTHING; 