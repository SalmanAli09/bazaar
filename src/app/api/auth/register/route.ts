import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, password, phoneNumber, role, storeName, pickupAddress, city, country } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: 'Full name, email, and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('user_id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Insert user
    const { data: newUser, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email,
        password_hash: passwordHash,
        full_name: fullName,
        phone_number: phoneNumber || null,
        role: role === 'seller' ? 'seller' : 'buyer',
        city: city || null,
        country: country || 'Pakistan',
        is_active: true,
      })
      .select()
      .single();

    if (userError) {
      console.error('User creation error:', userError);
      return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
    }

    // If seller, create seller profile
    if (role === 'seller' && newUser) {
      const { error: sellerError } = await supabaseAdmin
        .from('sellers')
        .insert({
          user_id: newUser.user_id,
          store_name: storeName || fullName + "'s Store",
          pickup_address: pickupAddress || null,
          city: city || null,
          country: country || 'Pakistan',
          rating: 0,
          review_count: 0,
          is_verified: false,
        });

      if (sellerError) {
        console.error('Seller creation error:', sellerError);
      }
    }

    // Return user without password_hash
    const { password_hash: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
