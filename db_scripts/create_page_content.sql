-- =============================================
-- Page Content Table for Page Editor Feature
-- =============================================
-- This table stores editable text content for the website.
-- Admins edit in Romanian, then auto-translate to other languages.

CREATE TABLE IF NOT EXISTS page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,  -- e.g., 'hero.heading', 'info.schedule.title'
  content_ro TEXT NOT NULL,
  content_en TEXT,
  content_it TEXT,
  content_fr TEXT,
  content_es TEXT,
  content_zh TEXT,
  content_ru TEXT,
  needs_translation BOOLEAN DEFAULT FALSE,  -- Flag when RO is edited but translations pending
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (if they exist from previous run)
DROP POLICY IF EXISTS "Public can read page content" ON page_content;
DROP POLICY IF EXISTS "Authenticated users can insert page content" ON page_content;
DROP POLICY IF EXISTS "Authenticated users can update page content" ON page_content;

-- Allow public read access (for frontend)
CREATE POLICY "Public can read page content"
  ON page_content FOR SELECT
  USING (true);

-- Allow authenticated users to insert/update (for admin)
CREATE POLICY "Authenticated users can insert page content"
  ON page_content FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update page content"
  ON page_content FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create index for fast lookups by section_key
CREATE INDEX IF NOT EXISTS idx_page_content_section_key ON page_content(section_key);

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_page_content_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS page_content_updated_at ON page_content;
CREATE TRIGGER page_content_updated_at
  BEFORE UPDATE ON page_content
  FOR EACH ROW
  EXECUTE FUNCTION update_page_content_timestamp();

-- Enable realtime for this table (skip if already added)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE page_content;
EXCEPTION
  WHEN duplicate_object THEN
    NULL; -- Already added, ignore
END $$;

-- =============================================
-- Version History Table for Page Editor
-- =============================================
-- Stores previous versions of content for revert functionality

CREATE TABLE IF NOT EXISTS page_content_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES page_content(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  content_ro TEXT NOT NULL,
  content_en TEXT,
  content_it TEXT,
  content_fr TEXT,
  content_es TEXT,
  content_zh TEXT,
  content_ru TEXT,
  version_number INTEGER NOT NULL DEFAULT 1,
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  change_description TEXT
);

-- Enable RLS on history table
ALTER TABLE page_content_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can read history" ON page_content_history;
DROP POLICY IF EXISTS "Authenticated can insert history" ON page_content_history;

-- Policies for history table
CREATE POLICY "Public can read history"
  ON page_content_history FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can insert history"
  ON page_content_history FOR INSERT
  WITH CHECK (true);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_history_content_id ON page_content_history(content_id);
CREATE INDEX IF NOT EXISTS idx_history_section_key ON page_content_history(section_key);

-- Function to automatically create history entry on update
CREATE OR REPLACE FUNCTION save_content_history()
RETURNS TRIGGER AS $$
DECLARE
  next_version INTEGER;
BEGIN
  -- Get next version number
  SELECT COALESCE(MAX(version_number), 0) + 1 INTO next_version
  FROM page_content_history
  WHERE content_id = OLD.id;
  
  -- Insert history record with old values
  INSERT INTO page_content_history (
    content_id, section_key, content_ro, content_en, content_it,
    content_fr, content_es, content_zh, content_ru, version_number
  ) VALUES (
    OLD.id, OLD.section_key, OLD.content_ro, OLD.content_en, OLD.content_it,
    OLD.content_fr, OLD.content_es, OLD.content_zh, OLD.content_ru, next_version
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic history tracking
DROP TRIGGER IF EXISTS trigger_save_content_history ON page_content;
CREATE TRIGGER trigger_save_content_history
  BEFORE UPDATE ON page_content
  FOR EACH ROW
  EXECUTE FUNCTION save_content_history();
