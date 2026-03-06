# Supabase Setup Instructions

## 1. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** > **API**
3. Copy the following:
   - **Project URL** (starts with https://)
   - **anon public** key

## 2. Create Environment File

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace with your actual credentials.

## 3. Run Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and run the schema from `supabase/migrations/db.schema.sql`

## 4. Test the Integration

1. Restart your Next.js development server
2. Try registering a new user
3. Check your Supabase database - you should see the user in the `users` table

## Schema Mapping

The code maps your form fields to database schema:

| Form Field | Database Column |
|------------|-----------------|
| fullName | full_name |
| email | email |
| cnic | cnic_number |
| isSeller | role (buyer/seller) |
| storeName | store_name |
| address | store_address |
| pickupAddress | pickup_address |
| phoneNumber | phone_number |

## Security Notes

- Passwords are hashed with bcryptjs before storing
- CNIC numbers are validated for Pakistan format
- Email uniqueness is enforced at database level
- All users start as unverified (is_verified = false)

## Troubleshooting

If you get connection errors:
1. Verify your Supabase URL and keys are correct
2. Make sure your `.env.local` file is in the project root
3. Restart your development server after adding env vars
4. Check that the database schema was applied correctly
