# Supabase Setup Guide

## 1. Create a Supabase Account

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up for a free account
3. Create a new project

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://xxx.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)

## 3. Set Up Environment Variables

1. Create a `.env.local` file in your project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Set Up Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `sql/setup.sql`
3. Click **Run** to execute the SQL script

This will create:
- `reports` table with all necessary columns
- `responses` table for psychologist responses
- Indexes for better performance
- Row Level Security policies
- Sample data for testing

## 5. Enable Real-time (Optional)

1. Go to **Database** → **Replication**
2. Enable replication for both `reports` and `responses` tables
3. This allows mobile apps to receive real-time updates

## 6. Update Your Code

The project is already configured to use Supabase. Simply:

1. Set your environment variables
2. Import from `@/lib/supabase-db` instead of `@/lib/db`
3. All functions remain the same!

## 7. For Mobile Apps - Real-time Tracking

Mobile apps can track report status changes in real-time:

```python
# Python example using supabase-py
from supabase import create_client

supabase = create_client(url, key)

def handle_update(payload):
    report = payload['new']
    print(f"Report {report['id']} status changed to: {report['status']}")

# Subscribe to specific report updates
supabase.table('reports').on('UPDATE', handle_update).subscribe()

# Or track specific report
supabase.table('reports').on('UPDATE', handle_update).filter('id', 'eq', 'report_id').subscribe()
```

## Migration from JSON Files

To migrate existing data:
1. Your JSON files in `data/db/` will still work
2. The new Supabase functions are drop-in replacements
3. You can import existing data via the SQL editor

## Benefits of Supabase

✅ **Real-time updates** - Mobile apps get instant notifications
✅ **Scalable** - No file system limitations  
✅ **Backup & Recovery** - Automatic backups
✅ **Performance** - Indexed queries, connection pooling
✅ **Free tier** - 50MB database, 2GB bandwidth
✅ **API out of the box** - RESTful API for mobile apps
✅ **Authentication ready** - Easy to add user auth later 