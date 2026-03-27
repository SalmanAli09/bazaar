import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: sellers, error } = await supabaseAdmin
      .from('sellers')
      .select('*, users(user_id, full_name, email, phone_number, is_active, created_at)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Admin sellers fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch sellers' }, { status: 500 });
    }

    // Get product counts per seller
    const { data: products } = await supabaseAdmin
      .from('products')
      .select('seller_id, is_published, is_sold');

    const countMap: Record<string, { total: number; active: number; sold: number }> = {};
    (products || []).forEach((p) => {
      if (!countMap[p.seller_id]) countMap[p.seller_id] = { total: 0, active: 0, sold: 0 };
      countMap[p.seller_id].total++;
      if (p.is_published && !p.is_sold) countMap[p.seller_id].active++;
      if (p.is_sold) countMap[p.seller_id].sold++;
    });

    const mapped = (sellers || []).map((s) => {
      const user = s.users as Record<string, unknown> | null;
      const counts = countMap[s.seller_id] || { total: 0, active: 0, sold: 0 };
      return {
        seller_id: s.seller_id,
        user_id: (user?.user_id as string) || '',
        store_name: s.store_name || '',
        full_name: (user?.full_name as string) || '',
        email: (user?.email as string) || '',
        phone_number: (user?.phone_number as string) || '',
        city: s.city || '',
        country: s.country || '',
        rating: s.rating || 0,
        review_count: s.review_count || 0,
        is_verified: s.is_verified || false,
        is_active: (user?.is_active as boolean) ?? true,
        created_at: (user?.created_at as string) || s.created_at,
        products_total: counts.total,
        products_active: counts.active,
        products_sold: counts.sold,
      };
    });

    return NextResponse.json({ sellers: mapped });
  } catch (error) {
    console.error('Admin sellers error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
