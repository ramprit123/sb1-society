/*
  # Create amenity bookings tables

  1. New Tables
    - `amenities`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `capacity` (integer)
      - `status` (text: available, maintenance)
      - `rules` (text[])
      - `operating_hours` (jsonb)

    - `amenity_bookings`
      - `id` (uuid, primary key)
      - `amenity_id` (uuid, references amenities)
      - `user_id` (uuid, references users)
      - `start_time` (timestamp with timezone)
      - `end_time` (timestamp with timezone)
      - `status` (text: pending, confirmed, cancelled)
      - `guests_count` (integer)
      - `purpose` (text)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS
    - Add policies for:
      - All users can read amenities
      - Users can read their own bookings
      - Users can create bookings
      - Admins can manage amenities and all bookings
*/

-- Amenities table
CREATE TABLE IF NOT EXISTS amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  capacity integer,
  status text DEFAULT 'available' CHECK (status IN ('available', 'maintenance')),
  rules text[],
  operating_hours jsonb
);

ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;

-- Amenity bookings table
CREATE TABLE IF NOT EXISTS amenity_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amenity_id uuid REFERENCES amenities(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  guests_count integer DEFAULT 0,
  purpose text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_booking_period CHECK (end_time > start_time)
);

ALTER TABLE amenity_bookings ENABLE ROW LEVEL SECURITY;

-- Amenities policies
CREATE POLICY "Amenities are readable by authenticated users"
  ON amenities
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage amenities"
  ON amenities
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Amenity bookings policies
CREATE POLICY "Users can read own bookings"
  ON amenity_bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create bookings"
  ON amenity_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM amenities
      WHERE amenities.id = amenity_id
      AND amenities.status = 'available'
    )
  );

CREATE POLICY "Users can update own bookings"
  ON amenity_bookings
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ))
  WITH CHECK (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Function to check booking conflicts
CREATE OR REPLACE FUNCTION check_booking_conflicts()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM amenity_bookings
    WHERE amenity_id = NEW.amenity_id
    AND status = 'confirmed'
    AND NEW.id != id
    AND (
      (NEW.start_time, NEW.end_time) OVERLAPS (start_time, end_time)
    )
  ) THEN
    RAISE EXCEPTION 'Booking time conflicts with an existing booking';
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER check_booking_conflicts_trigger
  BEFORE INSERT OR UPDATE
  ON amenity_bookings
  FOR EACH ROW
  EXECUTE PROCEDURE check_booking_conflicts();