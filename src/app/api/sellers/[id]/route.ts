import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Seller ID is required' },
        { status: 400 }
      );
    }

    // Fetch seller profile data
    const { data: seller, error: sellerError } = await supabase
      .from('users')
      .select(`
        id,
        full_name,
        email,
        store_name,
        store_address,
        pickup_address,
        phone_number,
        is_verified,
        is_active,
        created_at
      `)
      .eq('id', id)
      .eq('role', 'seller')
      .single();

    if (sellerError || !seller) {
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    // Fetch seller statistics
    const [
      { count: listings },
      { count: sales },
      { data: reviews }
    ] = await Promise.all([
      supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('seller_id', id)
        .eq('is_published', true),
      
      supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('seller_id', id)
        .eq('is_sold', true),
      
      supabase
        .from('product_reviews')
        .select('rating')
        .eq('seller_id', id)
    ]);

    const totalReviews = reviews?.length || 0;
    const avgRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;

    const sellerProfile = {
      ...seller,
      stats: {
        listings: listings || 0,
        sales: sales || 0,
        rating: Number(avgRating.toFixed(1)),
        reviews: totalReviews
      }
    };

    return NextResponse.json({ seller: sellerProfile }, { status: 200 });
  } catch (error) {
    console.error('Error fetching seller profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
