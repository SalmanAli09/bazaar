import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET seller detail with all their products
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch seller
    const { data: seller, error: sellerError } = await supabaseAdmin
      .from('sellers')
      .select('*, users(user_id, full_name, email, phone_number, is_active, created_at)')
      .eq('seller_id', id)
      .single();

    if (sellerError || !seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    // Fetch all products
    const { data: products } = await supabaseAdmin
      .from('products')
      .select('product_id, product_name, product_selling_price, condition, is_published, is_sold, is_draft, created_at, product_images(image_url, sort_order)')
      .eq('seller_id', id)
      .order('created_at', { ascending: false });

    const user = seller.users as Record<string, unknown> | null;

    const mappedProducts = (products || []).map((p) => {
      const images = (p.product_images as Array<{ image_url: string; sort_order: number }>) || [];
      images.sort((a, b) => a.sort_order - b.sort_order);
      return {
        id: p.product_id,
        name: p.product_name,
        price: p.product_selling_price,
        condition: p.condition,
        is_published: p.is_published,
        is_sold: p.is_sold,
        is_draft: p.is_draft,
        image: images[0]?.image_url || null,
        created_at: p.created_at,
      };
    });

    return NextResponse.json({
      seller: {
        seller_id: seller.seller_id,
        user_id: (user?.user_id as string) || '',
        store_name: seller.store_name || '',
        full_name: (user?.full_name as string) || '',
        email: (user?.email as string) || '',
        phone_number: (user?.phone_number as string) || '',
        city: seller.city || '',
        country: seller.country || '',
        rating: seller.rating || 0,
        is_verified: seller.is_verified || false,
        is_active: (user?.is_active as boolean) ?? true,
        created_at: (user?.created_at as string) || seller.created_at,
      },
      products: mappedProducts,
    });
  } catch (error) {
    console.error('Admin seller detail error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
