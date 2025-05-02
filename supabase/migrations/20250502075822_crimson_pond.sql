/*
  # Create events and event_attendees tables

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
      - `title` (text)
      - `description` (text)
      - `date` (timestamp with timezone)
      - `location` (text)
      - `image_url` (text)
      - `created_by` (uuid, references users)
      - `max_attendees` (integer)
      - `status` (text: upcoming, ongoing, completed, cancelled)

    - `event_attendees`
      - `id` (uuid, primary key)
      - `event_id` (uuid, references events)
      - `user_id` (uuid, references users)
      - `status` (text: interested, going, not_going)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on both tables
    - Add policies for:
      - All authenticated users can read events
      - Only admins can create/update events
      - Users can manage their own attendance
*/

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  location text,
  image_url text,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  max_attendees integer,
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled'))
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Event attendees table
CREATE TABLE IF NOT EXISTS event_attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  status text DEFAULT 'interested' CHECK (status IN ('interested', 'going', 'not_going')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Events are readable by authenticated users"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can update events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Event attendees policies
CREATE POLICY "Users can read event attendees"
  ON event_attendees
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own attendance"
  ON event_attendees
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Update trigger for events
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE
  ON events
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();