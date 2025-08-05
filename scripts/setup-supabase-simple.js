const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.log('Please make sure you have set in .env.local:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertSampleData() {
  console.log('🚀 Inserting sample data...');
  
  try {
    // Insert sample reports
    const sampleReports = [
      {
        child_info: {
          age: 8,
          gender: "female",
          location: "Gaza"
        },
        assessment_data: {
          parent_observations: "Child shows signs of anxiety and has trouble sleeping. Often startled by loud noises.",
          ai_analysis: "Initial analysis indicates symptoms consistent with acute stress response. Recommend immediate support for sleep issues and anxiety management.",
          severity_score: 7,
          risk_indicators: ["sleep disturbance", "heightened anxiety", "noise sensitivity"],
          cultural_context: "Recent exposure to conflict zone. Strong family support structure present."
        },
        media_attachments: {
          drawings: ["/mock/drawing1.jpg", "/mock/drawing2.jpg"],
          audio_recordings: ["/mock/audio1.mp3"],
          photos: []
        },
        status: "new",
        mobile_app_id: "mobile_001"
      },
      {
        child_info: {
          age: 12,
          gender: "male",
          location: "Ukraine"
        },
        assessment_data: {
          parent_observations: "Withdrawn behavior, refusing to attend school. Expresses fear about future.",
          ai_analysis: "Shows signs of depression and social withdrawal. Educational disruption impact observed.",
          severity_score: 6,
          risk_indicators: ["social isolation", "educational disruption", "depression symptoms"],
          cultural_context: "Displaced from home region. Currently in temporary housing with extended family."
        },
        media_attachments: {
          drawings: ["/mock/drawing3.jpg"],
          audio_recordings: [],
          photos: ["/mock/photo1.jpg"]
        },
        status: "in_review",
        mobile_app_id: "mobile_002"
      }
    ];

    const { data, error } = await supabase
      .from('reports')
      .insert(sampleReports)
      .select();

    if (error) {
      console.error('❌ Error inserting sample data:', error.message);
      return false;
    }

    console.log('✅ Sample data inserted successfully!');
    console.log(`📊 Inserted ${data.length} sample reports`);
    return true;

  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test basic connection by trying to fetch from reports table
    const { data, error } = await supabase
      .from('reports')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Connection failed:', error.message);
      console.log('\n💡 This usually means:');
      console.log('1. Tables haven\'t been created yet');
      console.log('2. Wrong environment variables');
      console.log('3. RLS policies blocking access');
      console.log('\n🛠️  To fix this:');
      console.log('1. Go to https://app.supabase.com');
      console.log('2. Open your project');
      console.log('3. Go to SQL Editor');
      console.log('4. Copy and paste the contents of sql/setup.sql');
      console.log('5. Click Run');
      return false;
    }

    console.log('✅ Connection successful!');
    console.log(`📊 Reports table exists and is accessible`);
    return true;

  } catch (error) {
    console.error('❌ Connection error:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Supabase Database Setup');
  console.log('========================\n');
  
  const connectionOk = await testConnection();
  
  if (connectionOk) {
    console.log('\n📝 Tables are ready! Inserting sample data...');
    await insertSampleData();
  } else {
    console.log('\n❌ Tables need to be created first.');
    console.log('\n📋 Please run this SQL in your Supabase dashboard:');
    console.log('=====================================');
    console.log(`
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

-- Enable Row Level Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Enable all access for reports" ON reports FOR ALL USING (true);
CREATE POLICY "Enable all access for responses" ON responses FOR ALL USING (true);
    `);
    console.log('=====================================');
    console.log('\nThen run this script again with: node scripts/setup-supabase-simple.js');
  }
}

if (require.main === module) {
  main();
} 