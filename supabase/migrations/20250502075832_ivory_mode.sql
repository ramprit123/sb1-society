/*
  # Create announcements table

  1. New Tables
    - `announcements`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
      - `title` (text)
      - `description` (text)
      - `type` (text: general, maintenance, emergency)
      - `created_by` (uuid, references users)
      - `start_date` (timestamp with timezone)
      - `end_date` (timestamp with timezone, optional)
      - `affected_blocks` (text array)
      - `status` (text: active, archived)

  2. Security
    - Enable RLS
    - Add policies for:
      - All authenticated users can read announcements
      - Only admins can create/update announcements
*/

CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  type text DEFAULT 'general' CHECK (type IN ('general', 'maintenance', 'emergency')),
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  affected_blocks text[],
  status text DEFAULT 'active' CHECK (status IN ('active', 'archived'))
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Announcements are readable by authenticated users"
  ON announcements
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create announcements"
  ON announcements
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can update announcements"
  ON announcements
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Update trigger
CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE
  ON announcements
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();