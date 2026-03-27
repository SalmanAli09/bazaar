import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .select('*, product_images(image_url, sort_order), sellers(seller_id, user_id, store_name, city, country, rating, review_count, is_verified)')
      .eq('product_id', id)
      .single();

    if (error || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Get seller's user info
    const seller = product.sellers as Record<string, unknown> | null;
    let sellerUser = null;
    if (seller?.user_id) {
      const { data: userData } = await supabaseAdmin
        .from('users')
        .select('full_name, email, phone_number')
        .eq('user_id', seller.user_id)
        .single();
      sellerUser = userData;
    }

    const images = (product.product_images as Array<{ image_url: string; sort_order: number }>) || [];
    images.sort((a, b) => a.sort_order - b.sort_order);

    const mapped = {
      id: product.product_id,
      seller_id: product.seller_id,
      category_id: product.category_id,
      ad_title: product.product_name,
      city: seller?.city || '',
      condition: product.condition,
      description: product.product_description || '',
      product_pictures: images.map((img) => img.image_url),
      selling_price: product.product_selling_price,
      original_price: product.product_actual_price || 0,
      negotiable_price: product.is_negotiable || false,
      featured: product.is_featured || false,
      urgent: product.is_urgent || false,
      is_draft: product.is_draft || false,
      is_published: product.is_published || false,
      is_sold: product.is_sold || false,
      created_at: product.created_at,
      updated_at: product.updated_at,
      seller: {
        id: seller?.seller_id || '',
        full_name: sellerUser?.full_name || '',
        email: sellerUser?.email || '',
        store_name: (seller?.store_name as string) || '',
        phone_number: sellerUser?.phone_number || '',
        is_verified: seller?.is_verified || false,
        rating: seller?.rating || 0,
        review_count: seller?.review_count || 0,
      },
    };

    return NextResponse.json({ product: mapped });
  } catch (error) {
    console.error('Product detail error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { error } = await supabaseAdmin
      .from('products')
      .update(body)
      .eq('product_id', id);

    if (error) {
      console.error('Product update error:', error);
      return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Product updated' });
  } catch (error) {
    console.error('Product PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
