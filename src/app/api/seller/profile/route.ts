import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('seller_id');

    if (!sellerId) {
      return NextResponse.json({ error: 'seller_id is required' }, { status: 400 });
    }

    // Fetch seller with user info
    const { data: seller, error: sellerError } = await supabaseAdmin
      .from('sellers')
      .select('*, users(full_name, email, phone_number, city, country)')
      .eq('seller_id', sellerId)
      .single();

    if (sellerError || !seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    const user = seller.users as Record<string, unknown> | null;

    const profile = {
      seller_id: seller.seller_id,
      user_id: seller.user_id,
      store_name: seller.store_name || '',
      store_banner_image: seller.store_banner_image || '',
      pickup_address: seller.pickup_address || '',
      city: seller.city || user?.city || '',
      country: seller.country || user?.country || '',
      rating: seller.rating || 0,
      review_count: seller.review_count || 0,
      is_verified: seller.is_verified || false,
      full_name: user?.full_name || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
    };

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Seller profile GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { seller_id, store_name, pickup_address, city, country, store_banner_image, full_name, phone_number } = body;

    if (!seller_id) {
      return NextResponse.json({ error: 'seller_id is required' }, { status: 400 });
    }

    // Get user_id from seller
    const { data: seller, error: fetchError } = await supabaseAdmin
      .from('sellers')
      .select('user_id')
      .eq('seller_id', seller_id)
      .single();

    if (fetchError || !seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    // Update sellers table
    const { error: sellerError } = await supabaseAdmin
      .from('sellers')
      .update({
        store_name: store_name ?? undefined,
        pickup_address: pickup_address ?? undefined,
        city: city ?? undefined,
        country: country ?? undefined,
        store_banner_image: store_banner_image ?? undefined,
      })
      .eq('seller_id', seller_id);

    if (sellerError) {
      console.error('Seller update error:', sellerError);
      return NextResponse.json({ error: 'Failed to update seller profile' }, { status: 500 });
    }

    // Update users table
    const { error: userError } = await supabaseAdmin
      .from('users')
      .update({
        full_name: full_name ?? undefined,
        phone_number: phone_number ?? undefined,
        city: city ?? undefined,
        country: country ?? undefined,
      })
      .eq('user_id', seller.user_id);

    if (userError) {
      console.error('User update error:', userError);
      return NextResponse.json({ error: 'Failed to update user profile' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Seller profile PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
