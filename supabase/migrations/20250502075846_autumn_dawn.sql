/*
  # Create payments and bills tables

  1. New Tables
    - `bills`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
      - `user_id` (uuid, references users)
      - `type` (text: maintenance, water, electricity)
      - `amount` (numeric)
      - `due_date` (date)
      - `status` (text: pending, paid, overdue)
      - `description` (text)
      - `period_start` (date)
      - `period_end` (date)

    - `payments`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `bill_id` (uuid, references bills)
      - `user_id` (uuid, references users)
      - `amount` (numeric)
      - `payment_method` (text)
      - `transaction_id` (text)
      - `status` (text: pending, completed, failed)

  2. Security
    - Enable RLS
    - Add policies for:
      - Users can read their own bills and payments
      - Admins can manage all bills and payments
      - Users can create payments for their bills
*/

-- Bills table
CREATE TABLE IF NOT EXISTS bills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text CHECK (type IN ('maintenance', 'water', 'electricity')),
  amount numeric NOT NULL CHECK (amount >= 0),
  due_date date NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  description text,
  period_start date NOT NULL,
  period_end date NOT NULL,
  CONSTRAINT valid_period CHECK (period_end >= period_start)
);

ALTER TABLE bills ENABLE ROW LEVEL SECURITY;

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  bill_id uuid REFERENCES bills(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  amount numeric NOT NULL CHECK (amount >= 0),
  payment_method text CHECK (payment_method IN ('card', 'upi', 'netbanking', 'cash')),
  transaction_id text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed'))
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Bills policies
CREATE POLICY "Users can read own bills"
  ON bills
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can create bills"
  ON bills
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can update bills"
  ON bills
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Payments policies
CREATE POLICY "Users can read own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create payments for own bills"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM bills
      WHERE bills.id = bill_id
      AND bills.user_id = auth.uid()
      AND bills.status = 'pending'
    )
  );

-- Update trigger for bills
CREATE TRIGGER update_bills_updated_at
  BEFORE UPDATE
  ON bills
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Function to update bill status when payment is completed
CREATE OR REPLACE FUNCTION update_bill_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' THEN
    UPDATE bills
    SET status = 'paid'
    WHERE id = NEW.bill_id;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bill_status_on_payment
  AFTER UPDATE
  ON payments
  FOR EACH ROW
  EXECUTE PROCEDURE update_bill_status();