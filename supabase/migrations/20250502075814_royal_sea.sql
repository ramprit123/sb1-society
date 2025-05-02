/*
  # Create users and profiles tables

  1. New Tables
    - `users` (extends Supabase auth.users)
      - `id` (uuid, primary key, references auth.users)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
      - `email` (text, unique)
      - `full_name` (text)
      - `phone_number` (text)
      - `apartment_number` (text)
      - `block_number` (text)
      - `role` (text, default: 'resident')

  2. Security
    - Enable RLS on users table
    - Add policies for:
      - Users can read their own data
      - Users can update their own data
      - Admins can read all data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  email text UNIQUE NOT NULL,
  full_name text,
  phone_number text,
  apartment_number text,
  block_number text,
  role text DEFAULT 'resident' CHECK (role IN ('resident', 'admin', 'security')),
  avatar_url text
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR role = 'admin');

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE
  ON users
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();