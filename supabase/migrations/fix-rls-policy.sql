-- ============================================
-- FIX FOR RLS POLICY VIOLATION
-- ============================================

-- Option 1: Disable RLS for users table (simple but less secure)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Option 2: Create RLS policy to allow inserts (recommended for production)
-- First, enable RLS if not already enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for registration)
CREATE POLICY "Allow insert for registration" ON users
  FOR INSERT WITH CHECK (true);

-- Allow users to read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Allow users to update their own data  
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Allow users to delete their own data
CREATE POLICY "Users can delete own data" ON users
  FOR DELETE USING (auth.uid()::text = id::text);

-- ============================================
-- ALTERNATIVE: More restrictive policy
-- ============================================

-- If you want more control, you can use this instead:

-- Drop existing policies if needed
-- DROP POLICY IF EXISTS "Allow insert for registration" ON users;
-- DROP POLICY IF EXISTS "Users can read own data" ON users;

-- Create more restrictive insert policy
-- CREATE POLICY "Allow user registration" ON users
--   FOR INSERT WITH CHECK (
--     email IS NOT NULL AND 
--     cnic_number IS NOT NULL AND
--     password IS NOT NULL
--   );

-- ============================================
-- TEST QUERY
-- ============================================

-- Test if you can now insert
-- INSERT INTO users (full_name, email, password, cnic_number, role, is_verified, is_active)
-- VALUES ('Test User', 'test@example.com', 'hashed_password', '12345-1234567-1', 'buyer', false, true);

-- SELECT * FROM users WHERE email = 'test@example.com';
