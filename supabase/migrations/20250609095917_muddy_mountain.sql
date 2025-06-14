/*
  # Storage Setup for Cover Images

  1. Storage Bucket
    - Create 'cover-images' bucket for novel cover images
    - Enable public read access
    - Set file size and type restrictions

  2. Security Policies
    - Users can upload files to their own folder
    - Users can manage their own files
    - Public read access for all cover images
*/

-- Create storage bucket for cover images (using proper storage functions)
DO $$
BEGIN
  -- Insert bucket if it doesn't exist
  INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES (
    'cover-images',
    'cover-images',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  ) ON CONFLICT (id) DO NOTHING;
EXCEPTION
  WHEN others THEN
    -- If we can't create the bucket, it might already exist
    NULL;
END $$;

-- Storage policies for cover images bucket
-- Note: These policies work on the storage.objects table through Supabase's RLS system

-- Policy: Users can upload files to their own folder
DO $$
BEGIN
  CREATE POLICY "Users can upload cover images to own folder"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'cover-images' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );
EXCEPTION
  WHEN duplicate_object THEN
    NULL; -- Policy already exists
END $$;

-- Policy: Users can update their own files
DO $$
BEGIN
  CREATE POLICY "Users can update own cover images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'cover-images' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );
EXCEPTION
  WHEN duplicate_object THEN
    NULL; -- Policy already exists
END $$;

-- Policy: Users can delete their own files
DO $$
BEGIN
  CREATE POLICY "Users can delete own cover images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'cover-images' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );
EXCEPTION
  WHEN duplicate_object THEN
    NULL; -- Policy already exists
END $$;

-- Policy: Public read access for all cover images
DO $$
BEGIN
  CREATE POLICY "Public read access for cover images"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'cover-images');
EXCEPTION
  WHEN duplicate_object THEN
    NULL; -- Policy already exists
END $$;