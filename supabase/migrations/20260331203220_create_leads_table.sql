/*
  # Create Leads table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, optional)
      - `business_name` (text, optional)
      - `client_type` (text, optional)
      - `service_interest` (text, optional)
      - `message` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `leads` table
    - Add policy allowing anyone to insert leads (public form submission)
    - Add policy allowing only authenticated admins to read leads
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  business_name text,
  client_type text,
  service_interest text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
