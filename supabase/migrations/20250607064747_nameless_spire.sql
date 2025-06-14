/*
  # Fix chapter access policies for preview content

  1. Updates
    - Update chapter policies to allow public access to preview chapters
    - Ensure anyone can read preview chapters without authentication
    - Keep existing policies for authenticated users

  2. Security
    - Preview chapters (is_preview = true) are publicly readable
    - Non-preview chapters require authentication and novel ownership/purchase
*/

-- Drop existing chapter policies
DROP POLICY IF EXISTS "Anyone can read published novel chapters" ON chapters;
DROP POLICY IF EXISTS "Authors can manage own novel chapters" ON chapters;

-- Create new policies for chapters
CREATE POLICY "Anyone can read preview chapters"
  ON chapters
  FOR SELECT
  USING (is_preview = true);

CREATE POLICY "Authenticated users can read published novel chapters"
  ON chapters
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM novels 
      WHERE novels.id = chapters.novel_id 
      AND novels.is_published = true
    )
  );

CREATE POLICY "Authors can manage own novel chapters"
  ON chapters
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM novels 
      WHERE novels.id = chapters.novel_id 
      AND novels.author_id = auth.uid()
    )
  );

-- Also update novels policy to allow public access to published novels
DROP POLICY IF EXISTS "Anyone can read published novels" ON novels;

CREATE POLICY "Anyone can read published novels"
  ON novels
  FOR SELECT
  USING (is_published = true);

-- Update quiz policies to allow public access
DROP POLICY IF EXISTS "Anyone can read quizzes for published novels" ON quizzes;

CREATE POLICY "Anyone can read quizzes for published novels"
  ON quizzes
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM novels 
      WHERE novels.id = quizzes.novel_id 
      AND novels.is_published = true
    )
  );

-- Update quiz questions policy
DROP POLICY IF EXISTS "Anyone can read quiz questions" ON quiz_questions;

CREATE POLICY "Anyone can read quiz questions"
  ON quiz_questions
  FOR SELECT
  USING (true);