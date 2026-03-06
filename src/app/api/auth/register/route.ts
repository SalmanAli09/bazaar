import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '@/lib/supabase-database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      fullName, 
      email, 
      cnic, 
      password, 
      isSeller, 
      storeName, 
      pickupAddress, 
      address, 
      phoneNumber 
    } = body;

    // Validation
    if (!fullName || !email || !cnic || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Validate CNIC format (Pakistan CNIC: XXXXX-XXXXXXX-X)
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicRegex.test(cnic)) {
      return NextResponse.json(
        { error: 'Invalid CNIC format. Use format: XXXXX-XXXXXXX-X' },
        { status: 400 }
      );
    }

    // Validate seller fields if registering as seller
    if (isSeller) {
      if (!storeName || !pickupAddress || !address || !phoneNumber) {
        return NextResponse.json(
          { error: 'All seller fields are required when registering as a seller' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with Supabase schema
    const newUser = await createUser({
      full_name: fullName,
      email,
      password: hashedPassword,
      cnic_number: cnic,
      role: isSeller ? 'seller' : 'buyer',
      ...(isSeller && {
        store_name: storeName,
        store_address: address,
        pickup_address: pickupAddress,
        phone_number: phoneNumber
      }),
      is_verified: false,
      is_active: true
    });

    if (!newUser) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
