/*
  # Initial Schema for Taleverse Platform

  1. New Tables
    - `profiles` - User profiles with Web3 integration
    - `novels` - Published novels and stories
    - `chapters` - Individual chapters for novels
    - `quizzes` - Comprehension quizzes for novels
    - `quiz_questions` - Questions for each quiz
    - `quiz_results` - User quiz completion results
    - `user_library` - User's saved/purchased novels
    - `comments` - Comments on novels and chapters

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure user data access
*/

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  username text UNIQUE,
  profile_image text,
  tokens integer DEFAULT 50,
  nfts text[] DEFAULT '{}',
  is_writer boolean DEFAULT false,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create novels table
CREATE TABLE IF NOT EXISTS novels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  cover_image text,
  genre text NOT NULL,
  rating numeric(3,2) DEFAULT 0,
  price integer DEFAULT 0,
  is_published boolean DEFAULT false,
  total_chapters integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chapters table
CREATE TABLE IF NOT EXISTS chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  novel_id uuid REFERENCES novels(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  chapter_number integer NOT NULL,
  is_preview boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(novel_id, chapter_number)
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  novel_id uuid REFERENCES novels(id) ON DELETE CASCADE,
  title text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  options text[] NOT NULL,
  correct_answer_index integer NOT NULL,
  question_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(quiz_id, question_number)
);

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  percentage integer NOT NULL,
  tokens_earned integer DEFAULT 0,
  nft_earned boolean DEFAULT false,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, quiz_id)
);

-- Create user_library table
CREATE TABLE IF NOT EXISTS user_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  novel_id uuid REFERENCES novels(id) ON DELETE CASCADE,
  progress integer DEFAULT 0,
  is_purchased boolean DEFAULT false,
  added_at timestamptz DEFAULT now(),
  UNIQUE(user_id, novel_id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  novel_id uuid REFERENCES novels(id) ON DELETE CASCADE,
  chapter_id uuid REFERENCES chapters(id) ON DELETE CASCADE,
  content text NOT NULL,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE novels ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Novels policies
CREATE POLICY "Anyone can read published novels"
  ON novels
  FOR SELECT
  TO authenticated
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

-- Chapters policies
CREATE POLICY "Anyone can read published novel chapters"
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

-- Quizzes policies
CREATE POLICY "Anyone can read quizzes for published novels"
  ON quizzes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM novels 
      WHERE novels.id = quizzes.novel_id 
      AND novels.is_published = true
    )
  );

-- Quiz questions policies
CREATE POLICY "Anyone can read quiz questions"
  ON quiz_questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Quiz results policies
CREATE POLICY "Users can read own quiz results"
  ON quiz_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results"
  ON quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User library policies
CREATE POLICY "Users can manage own library"
  ON user_library
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_novels_author_id ON novels(author_id);
CREATE INDEX IF NOT EXISTS idx_novels_genre ON novels(genre);
CREATE INDEX IF NOT EXISTS idx_novels_published ON novels(is_published);
CREATE INDEX IF NOT EXISTS idx_chapters_novel_id ON chapters(novel_id);
CREATE INDEX IF NOT EXISTS idx_chapters_number ON chapters(novel_id, chapter_number);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_user_library_user ON user_library(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_novel ON comments(novel_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_novels_updated_at
  BEFORE UPDATE ON novels
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chapters_updated_at
  BEFORE UPDATE ON chapters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quizzes_updated_at
  BEFORE UPDATE ON quizzes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();