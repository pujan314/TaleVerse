/*
  # Fix public access policies for novels, chapters, and quizzes

  1. Policy Updates
    - Drop and recreate policies to ensure proper public access
    - Allow public users to read published novels and preview chapters
    - Allow public users to access quizzes for published novels
    - Maintain existing authenticated user permissions

  2. Security
    - Ensure RLS remains enabled
    - Maintain proper access controls for authors
    - Allow public access only where appropriate
*/

-- Drop existing policies that need to be updated
DROP POLICY IF EXISTS "Anyone can read published novels" ON novels;
DROP POLICY IF EXISTS "Authors can read own novels" ON novels;
DROP POLICY IF EXISTS "Authors can create novels" ON novels;
DROP POLICY IF EXISTS "Authors can update own novels" ON novels;

DROP POLICY IF EXISTS "Anyone can read preview chapters" ON chapters;
DROP POLICY IF EXISTS "Authenticated users can read published novel chapters" ON chapters;
DROP POLICY IF EXISTS "Authors can manage own novel chapters" ON chapters;

DROP POLICY IF EXISTS "Anyone can read quizzes for published novels" ON quizzes;
DROP POLICY IF EXISTS "Anyone can read quiz questions" ON quiz_questions;

-- Create new policies for novels with public access
CREATE POLICY "Public can read published novels"
  ON novels
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authors can read own novels"
  ON novels
  FOR SELECT
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Authors can create novels"
  ON novels
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own novels"
  ON novels
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

-- Create new policies for chapters with public preview access
CREATE POLICY "Public can read preview chapters"
  ON chapters
  FOR SELECT
  TO public
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

-- Create quiz policies for public access
CREATE POLICY "Public can read quizzes for published novels"
  ON quizzes
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM novels 
      WHERE novels.id = quizzes.novel_id 
      AND novels.is_published = true
    )
  );

CREATE POLICY "Public can read quiz questions"
  ON quiz_questions
  FOR SELECT
  TO public
  USING (true);