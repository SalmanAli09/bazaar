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
    const limit = parseInt(searchParams.get('limit') || '12');
    const status = searchParams.get('status') || 'published'; // published, sold, all
    const offset = (page - 1) * limit;

    if (!id) {
      return NextResponse.json(
        { error: 'Seller ID is required' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(
          name,
          icon
        )
      `, { count: 'exact' })
      .eq('seller_id', id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply status filter
    if (status === 'published') {
      query = query.eq('is_published', true).eq('is_sold', false);
    } else if (status === 'sold') {
      query = query.eq('is_sold', true);
    }
    // 'all' status doesn't apply any additional filters

    const { data: listings, error, count } = await query;

    if (error) {
      console.error('Error fetching seller listings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch listings' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching seller listings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
