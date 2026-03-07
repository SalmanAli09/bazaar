import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (!id) {
      return NextResponse.json(
        { error: 'Seller ID is required' },
        { status: 400 }
      );
    }

    // Fetch reviews with reviewer information
    const { data: reviews, error, count } = await supabase
      .from('product_reviews')
      .select(`
        *,
        reviewer:users(
          full_name
        ),
        product:products(
          ad_title,
          product_pictures
        )
      `, { count: 'exact' })
      .eq('seller_id', id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }

    // Calculate rating distribution
    const ratingCounts = reviews?.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>) ?? {};

    const ratingDistribution = {
      5: ratingCounts[5] || 0,
      4: ratingCounts[4] || 0,
      3: ratingCounts[3] || 0,
      2: ratingCounts[2] || 0,
      1: ratingCounts[1] || 0
    };

    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      },
      ratingDistribution
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching seller reviews:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
