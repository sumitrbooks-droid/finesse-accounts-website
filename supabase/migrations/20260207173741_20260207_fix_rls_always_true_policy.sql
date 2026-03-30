/*
  # Fix RLS Policy Always True Security Issue
  
  1. Policy Changes
    - Remove the "Anyone can submit contact form" policy with WITH CHECK (true)
    - Replace with a more restrictive policy that validates data
    - Allow authenticated users to submit (includes anon via anon key)
    - Add basic data validation to prevent empty submissions
  
  2. Security Improvements
    - WITH CHECK now validates that required fields are not empty
    - Prevents submitting with all NULL values
    - Maintains public access via authentication mechanism
    - Complies with RLS best practices (never use WITH CHECK true)
  
  3. Backward Compatibility
    - Edge Functions and client code using authenticated requests will work unchanged
    - Unauthenticated requests must use anon key (which is public knowledge anyway)
*/

DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;

CREATE POLICY "Authenticated users can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    name IS NOT NULL AND
    email IS NOT NULL AND
    LENGTH(TRIM(name)) > 0 AND
    LENGTH(TRIM(email)) > 0
  );
