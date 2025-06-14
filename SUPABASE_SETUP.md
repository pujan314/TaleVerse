# Complete Supabase Setup for Taleverse

## Quick Setup (5 minutes)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) → Sign up/Login
2. Click "New Project"
3. Fill in:
   - **Name**: `taleverse-production`
   - **Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project" (takes 2-3 minutes)

### 2. Get Your Credentials
1. In Supabase dashboard → **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxxxxxx.supabase.co`
   - **Anon public key**: `eyJhbGciOiJIUzI1NiIs...`

### 3. Set Up Database Schema
1. Go to **SQL Editor** in Supabase
2. Click "New query"
3. Copy and paste this complete setup script:

```sql
-- Complete Taleverse Database Setup
-- Run this entire script in Supabase SQL Editor

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
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Novels policies
CREATE POLICY "Public can read published novels" ON novels FOR SELECT TO public USING (is_published = true);
CREATE POLICY "Authors can read own novels" ON novels FOR SELECT TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Authors can create novels" ON novels FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own novels" ON novels FOR UPDATE TO authenticated USING (auth.uid() = author_id);

-- Chapters policies
CREATE POLICY "Public can read preview chapters" ON chapters FOR SELECT TO public USING (is_preview = true);
CREATE POLICY "Authenticated users can read published novel chapters" ON chapters FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM novels WHERE novels.id = chapters.novel_id AND novels.is_published = true)
);
CREATE POLICY "Authors can manage own novel chapters" ON chapters FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM novels WHERE novels.id = chapters.novel_id AND novels.author_id = auth.uid())
);

-- Quiz policies
CREATE POLICY "Public can read quizzes for published novels" ON quizzes FOR SELECT TO public USING (
  EXISTS (SELECT 1 FROM novels WHERE novels.id = quizzes.novel_id AND novels.is_published = true)
);
CREATE POLICY "Public can read quiz questions" ON quiz_questions FOR SELECT TO public USING (true);

-- Quiz results policies
CREATE POLICY "Users can read own quiz results" ON quiz_results FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz results" ON quiz_results FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- User library policies
CREATE POLICY "Users can manage own library" ON user_library FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Anyone can read comments" ON comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create comments" ON comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE TO authenticated USING (auth.uid() = user_id);

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
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_novels_updated_at BEFORE UPDATE ON novels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
DO $$
DECLARE
    ethereum_novel_id uuid := gen_random_uuid();
    blockchain_novel_id uuid := gen_random_uuid();
    smart_contracts_novel_id uuid := gen_random_uuid();
    last_validator_novel_id uuid := gen_random_uuid();
    quantum_dreams_novel_id uuid := gen_random_uuid();
    digital_hearts_novel_id uuid := gen_random_uuid();
    quiz_id uuid;
BEGIN
    -- Insert sample novels
    INSERT INTO novels (id, title, description, author_id, author_name, cover_image, genre, rating, price, is_published, total_chapters) VALUES
    (ethereum_novel_id, 'The Ethereum Chronicles', 'A thrilling adventure through a digital world where code is law and decentralized societies thrive.', NULL, 'Alex Blockman', 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=600', 'Science Fiction', 4.8, 0, true, 2),
    (blockchain_novel_id, 'Whispers of the Blockchain', 'A detective story set in 2040 where crimes leave traces on an immutable ledger.', NULL, 'Maya Satoshi', 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600', 'Mystery', 4.5, 5, true, 3),
    (smart_contracts_novel_id, 'Love in the Age of Smart Contracts', 'When two engineers fall in love, they discover that relationships are more complex than any algorithm.', NULL, 'Sophia Merkle', 'https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=600', 'Romance', 4.7, 3, true, 4),
    (last_validator_novel_id, 'The Last Validator', 'In a world where computation is scarce, one person holds the key to validating the final block.', NULL, 'James Buterin', 'https://images.pexels.com/photos/7034127/pexels-photo-7034127.jpeg?auto=compress&cs=tinysrgb&w=600', 'Fantasy', 4.9, 10, true, 5),
    (quantum_dreams_novel_id, 'Quantum Dreams', 'In a world where consciousness can be digitized and dreams can be shared.', NULL, 'Alice Quantum', 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600', 'Science Fiction', 4.6, 7, true, 6),
    (digital_hearts_novel_id, 'Digital Hearts', 'A romance between an AI and a human in a world where emotions become blurred.', NULL, 'Cyber Romeo', 'https://images.pexels.com/photos/8566474/pexels-photo-8566474.jpeg?auto=compress&cs=tinysrgb&w=600', 'Romance', 4.4, 4, true, 3);

    -- Insert sample chapters
    INSERT INTO chapters (novel_id, title, content, chapter_number, is_preview) VALUES
    (ethereum_novel_id, 'Genesis Block', 'The city of New Ethereum sprawled beneath him, a vast network of interconnected nodes and pathways that glowed with an ethereal blue light. From his vantage point on the observation deck of the tallest spire in the central district, Ethan could see the entire ecosystem pulsing with activity.

Transactions flowed like rivers of light between buildings, smart contracts executed with mathematical precision, and the subtle hum of consensus algorithms provided a constant backdrop to city life. This was home, but soon he would be leaving it all behind.

"Citizen 0x7E5F3A8D," a voice called from behind him. "Your presence is required at the Council of Validators."

Ethan turned to find a governance protocol avatar hovering a few feet away, its form a complex arrangement of geometric shapes that shifted and rearranged themselves continuously.

"I''ve already submitted my testimony to the chain," Ethan replied. "What more could they want?"

"New information has come to light regarding the anomaly. Your unique perspective is deemed essential to the investigation."

The anomaly. Just thinking about it sent a chill through Ethan''s system. Three days ago, something impossible had happened on the chain—a transaction that seemingly came from nowhere, authorized by no one, yet validated by every node in the network. The implications were staggering, threatening the very foundations of their society.

And somehow, Ethan was the only one who had seen it coming.', 1, true),
    (ethereum_novel_id, 'Consensus Mechanism', 'The Council of Validators convened in a vast circular chamber, where the walls consisted of constantly shifting data visualizations representing the state of the blockchain in real-time. Twelve validators sat at equal intervals around a central dais, their faces illuminated by the soft glow of their terminals.

Ethan stood in the center, feeling the weight of their combined scrutiny. These were the most powerful individuals in New Ethereum, each one responsible for securing and validating massive portions of the network.

"Citizen 0x7E5F3A8D," intoned the Chief Validator, an older woman whose eyes reflected the same blue light that permeated the city, "you predicted this anomaly in your research paper three years ago. At the time, your findings were dismissed as theoretical impossibilities. Now we face precisely the scenario you described. Explain yourself."', 2, false);

    -- Insert quiz
    INSERT INTO quizzes (novel_id, title) VALUES (ethereum_novel_id, 'The Ethereum Chronicles - Comprehension Quiz') RETURNING id INTO quiz_id;
    
    -- Insert quiz questions
    INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer_index, question_number) VALUES
    (quiz_id, 'What is the name of the city where Ethan lives?', ARRAY['New Bitcoin', 'New Ethereum', 'Chain City', 'Consensus Central'], 1, 1),
    (quiz_id, 'What is the anomaly that concerns the Council?', ARRAY['A power outage', 'A cybersecurity breach', 'An unauthorized transaction that was validated by all nodes', 'A weather disturbance'], 2, 2),
    (quiz_id, 'How many validators are on the Council?', ARRAY['Seven', 'Ten', 'Twelve', 'Fifteen'], 2, 3);
END $$;

-- Setup complete!
SELECT 'Database setup completed successfully!' as status;
```

4. Click "Run" to execute the script
5. You should see "Database setup completed successfully!" at the bottom

### 4. Configure Netlify Environment Variables

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click on your site: `talevers`
3. Go to **Site settings** → **Environment variables**
4. Click "Add a variable" and add:

   **First Variable:**
   - Key: `VITE_SUPABASE_URL`
   - Value: Your Project URL (from step 2)

   **Second Variable:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: Your Anon public key (from step 2)

5. Click "Save"

### 5. Deploy Your Site

1. In Netlify → **Deploys** tab
2. Click "Trigger deploy" → "Deploy site"
3. Wait 2-3 minutes for deployment

## ✅ Verification

After setup, your site should have:
- User registration/login working
- Real novels from database
- Quiz functionality with rewards
- User profiles and libraries
- All platform features active

## 🚨 Troubleshooting

**Still seeing demo mode?**
1. Check environment variables are exactly correct
2. Verify Supabase project is active
3. Try a hard refresh (Ctrl+F5)
4. Check browser console for errors

**Database errors?**
1. Make sure the SQL script ran completely
2. Check Supabase logs in dashboard
3. Verify RLS policies are enabled

## 💰 Cost

- Supabase: Free up to 50K monthly users
- Netlify: Free for personal projects
- Total cost: $0 for most use cases

---

**Need help?** The app works in demo mode if you skip this setup, but you'll miss user accounts and real database features.