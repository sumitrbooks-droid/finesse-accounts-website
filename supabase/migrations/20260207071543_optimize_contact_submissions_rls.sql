/*
  # Optimize Contact Submissions RLS and Indexes

  1. RLS Policy Performance
    - Update SELECT policy to use subquery for auth.jwt() evaluation
    - Improves performance by avoiding re-evaluation for each row
  
  2. Cleanup
    - Drop unused indexes that have no performance impact
*/

DROP POLICY IF EXISTS "Only admins can view submissions" ON contact_submissions;

CREATE POLICY "Only admins can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING ((select auth.jwt()) ->> 'role' = 'admin');

DROP INDEX IF EXISTS idx_contact_email;
DROP INDEX IF EXISTS idx_contact_created;
