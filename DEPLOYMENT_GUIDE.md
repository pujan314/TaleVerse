# Taleverse Deployment Guide

## Setting Up Supabase Database for Production

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and fill in:
   - **Project Name**: `taleverse` (or any name you prefer)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait for the project to be created (takes 1-2 minutes)

### Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### Step 3: Run Database Migrations

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the content from `supabase/migrations/20250606071201_crimson_torch.sql`
3. Click "Run" to create all the tables
4. Then copy and paste the content from `supabase/migrations/20250607055107_odd_sound.sql`
5. Click "Run" to add sample data
6. Finally, run the other migration files in order

### Step 4: Configure Netlify Environment Variables

1. Go to your [Netlify dashboard](https://app.netlify.com)
2. Click on your site (`talevers`)
3. Go to **Site settings** → **Environment variables**
4. Click "Add a variable" and add these two:

   **Variable 1:**
   - Key: `VITE_SUPABASE_URL`
   - Value: Your Project URL from Step 2

   **Variable 2:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: Your Anon public key from Step 2

5. Click "Save"

### Step 5: Redeploy Your Site

1. In Netlify, go to **Deploys**
2. Click "Trigger deploy" → "Deploy site"
3. Wait for the deployment to complete

## Alternative: Continue in Demo Mode

If you don't want to set up Supabase right now, your site will continue to work in demo mode with:
- Mock data for novels and content
- Full UI functionality
- No user accounts or real database features

## Verifying the Setup

After completing the steps above, your site should have:
- ✅ User registration and login
- ✅ Real novel data from the database
- ✅ Quiz functionality with token rewards
- ✅ User profiles and libraries
- ✅ Full platform features

## Troubleshooting

If you still have issues after setup:

1. **Check Environment Variables**: Make sure they're exactly as shown above
2. **Verify Supabase Project**: Ensure your project is active and the URL is correct
3. **Check Browser Console**: Look for any error messages
4. **Redeploy**: Sometimes you need to trigger a new deployment after adding variables

## Cost Information

- Supabase has a generous free tier (up to 50,000 monthly active users)
- Netlify hosting is free for personal projects
- You only pay if you exceed the free limits