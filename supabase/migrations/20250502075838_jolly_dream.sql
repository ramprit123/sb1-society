/*
  # Create maintenance requests table

  1. New Tables
    - `maintenance_requests`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
      - `title` (text)
      - `description` (text)
      - `type` (text: plumbing, electrical, etc.)
      - `status` (text: pending, in_progress, completed, cancelled)
      - `priority` (text: low, medium, high, urgent)
      - `created_by` (uuid, references users)
      - `assigned_to` (uuid, references users)
      - `scheduled_date` (timestamp with timezone)
      - `completed_date` (timestamp with timezone)
      - `notes` (text)
      - `images` (text array)

  2. Security
    - Enable RLS
    - Add policies for:
      - Users can read their own requests
      - Users can create requests
      - Admins can read and update all requests
*/

CREATE TABLE IF NOT EXISTS maintenance_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  type text CHECK (type IN ('plumbing', 'electrical', 'cleaning', 'security', 'other')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  scheduled_date timestamptz,
  completed_date timestamptz,
  notes text,
  images text[]
);

ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own requests"
  ON maintenance_requests
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create requests"
  ON maintenance_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own requests"
  ON maintenance_requests
  FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin') OR
    assigned_to = auth.uid()
  )
  WITH CHECK (
    created_by = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin') OR
    assigned_to = auth.uid()
  );

-- Update trigger
CREATE TRIGGER update_maintenance_requests_updated_at
  BEFORE UPDATE
  ON maintenance_requests
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();