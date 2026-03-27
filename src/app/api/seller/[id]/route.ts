import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch seller with user info
    const { data: seller, error: sellerError } = await supabaseAdmin
      .from('sellers')
      .select('*, users(full_name, email, phone_number, created_at)')
      .eq('seller_id', id)
      .single();

    if (sellerError || !seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    const user = seller.users as Record<string, unknown> | null;

    // Fetch seller analytics
    const { data: analytics } = await supabaseAdmin
      .from('seller_analytics')
      .select('total_revenue, total_items_sold, monthly_items_sold')
      .eq('seller_id', id)
      .single();

    // Count active listings
    const { count: listingsCount } = await supabaseAdmin
      .from('products')
      .select('product_id', { count: 'exact', head: true })
      .eq('seller_id', id)
      .eq('is_published', true)
      .eq('is_sold', false);

    const profile = {
      id: seller.seller_id,
      full_name: (user?.full_name as string) || '',
      email: (user?.email as string) || '',
      store_name: seller.store_name || '',
      store_banner_image: seller.store_banner_image || '',
      store_address: seller.city ? `${seller.city}, ${seller.country || 'Pakistan'}` : '',
      pickup_address: seller.pickup_address || '',
      phone_number: (user?.phone_number as string) || '',
      city: seller.city || '',
      country: seller.country || '',
      is_verified: seller.is_verified || false,
      rating: seller.rating || 0,
      review_count: seller.review_count || 0,
      created_at: (user?.created_at as string) || seller.created_at,
      stats: {
        listings: listingsCount || 0,
        sales: analytics?.total_items_sold || 0,
        rating: seller.rating || 0,
        reviews: seller.review_count || 0,
      },
    };

    return NextResponse.json({ seller: profile });
  } catch (error) {
    console.error('Public seller profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
