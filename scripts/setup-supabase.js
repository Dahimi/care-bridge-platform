const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.log('Please make sure you have set:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...');
  
  try {
    // Read the SQL setup file
    const sqlPath = path.join(__dirname, '..', 'sql', 'setup.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Split SQL into individual statements (rough split)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`📝 Executing ${statements.length} SQL statements...`);
    
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`⚡ Executing: ${statement.substring(0, 50)}...`);
        const { error } = await supabase.rpc('exec_sql', { sql_query: statement + ';' });
        
        if (error) {
          console.warn(`⚠️  Warning for statement: ${error.message}`);
          // Continue with other statements
        }
      }
    }
    
    console.log('✅ Database setup completed!');
    console.log('🔍 Verifying tables...');
    
    // Verify tables exist
    const { data: reports, error: reportsError } = await supabase
      .from('reports')
      .select('count', { count: 'exact', head: true });
      
    const { data: responses, error: responsesError } = await supabase
      .from('responses')
      .select('count', { count: 'exact', head: true });
    
    if (!reportsError && !responsesError) {
      console.log('✅ All tables created successfully!');
      console.log(`📊 Reports table: Ready`);
      console.log(`📝 Responses table: Ready`);
    } else {
      console.log('❌ Some tables may not have been created properly');
      if (reportsError) console.log('Reports error:', reportsError.message);
      if (responsesError) console.log('Responses error:', responsesError.message);
    }
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    console.log('\n💡 Try running the SQL manually in your Supabase dashboard:');
    console.log('1. Go to https://app.supabase.com');
    console.log('2. Open your project');
    console.log('3. Go to SQL Editor');
    console.log('4. Copy and paste the contents of sql/setup.sql');
    console.log('5. Click Run');
  }
}

// Alternative method using direct SQL execution
async function setupDatabaseDirect() {
  console.log('🚀 Setting up Supabase database (direct method)...');
  
  try {
    // Create reports table
    console.log('📝 Creating reports table...');
    const { error: reportError } = await supabase.rpc('exec_sql', {
      sql_query: `
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
      `
    });
    
    if (reportError) {
      console.log('⚠️  Reports table may already exist or other issue:', reportError.message);
    }
    
    // Create responses table
    console.log('📝 Creating responses table...');
    const { error: responseError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS responses (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
          psychologist_notes TEXT NOT NULL,
          recommendations JSONB NOT NULL,
          urgency_level TEXT NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high', 'critical')),
          response_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          psychologist_id TEXT NOT NULL
        );
      `
    });
    
    if (responseError) {
      console.log('⚠️  Responses table may already exist or other issue:', responseError.message);
    }
    
    console.log('✅ Database setup completed!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
  }
}

// Run the setup
if (require.main === module) {
  setupDatabaseDirect();
} 