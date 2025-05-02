/*
  # Create guest entries table

  1. New Tables
    - `guest_entries`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `user_id` (uuid, references users)
      - `guest_name` (text)
      - `guest_phone` (text)
      - `purpose` (text)
      - `expected_arrival` (timestamp with timezone)
      - `actual_arrival` (timestamp with timezone)
      - `actual_departure` (timestamp with timezone)
      - `status` (text: scheduled, checked_in, checked_out, cancelled)
      - `vehicle_number` (text)
      - `approved_by` (uuid, references users)

  2. Security
    - Enable RLS
    - Add policies for:
      - Users can read and create their own guest entries
      - Security staff can read and update all entries
      - Admins have full access
*/

CREATE TABLE IF NOT EXISTS guest_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  guest_name text NOT NULL,
  guest_phone text,
  purpose text,
  expected_arrival timestamptz NOT NULL,
  actual_arrival timestamptz,
  actual_departure timestamptz,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'checked_in', 'checked_out', 'cancelled')),
  vehicle_number text,
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL
);

ALTER TABLE guest_entries ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own guest entries"
  ON guest_entries
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'security')
    )
  );

CREATE POLICY "Users can create guest entries"
  ON guest_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own guest entries"
  ON guest_entries
  FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'security')
    )
  )
  WITH CHECK (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'security')
    )
  );

-- Function to validate guest entry status transitions
CREATE OR REPLACE FUNCTION validate_guest_entry_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if status transition is valid
  IF OLD.status = 'checked_out' AND NEW.status != 'checked_out' THEN
    RAISE EXCEPTION 'Cannot change status after check-out';
  END IF;

  -- Set actual arrival time when checking in
  IF NEW.status = 'checked_in' AND OLD.status = 'scheduled' THEN
    NEW.actual_arrival = now();
  END IF;

  -- Set actual departure time when checking out
  IF NEW.status = 'checked_out' AND OLD.status = 'checked_in' THEN
    NEW.actual_departure = now();
  END IF;

  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER validate_guest_entry_status_trigger
  BEFORE UPDATE
  ON guest_entries
  FOR EACH ROW
  EXECUTE PROCEDURE validate_guest_entry_status();