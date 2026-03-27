import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Helper to map DB product rows to the frontend Product shape
function mapProduct(row: Record<string, unknown>) {
  const images = (row.product_images as Array<{ image_url: string; sort_order: number }>) || [];
  images.sort((a, b) => a.sort_order - b.sort_order);

  return {
    id: row.product_id,
    seller_id: row.seller_id,
    category_id: row.category_id,
    ad_title: row.product_name,
    city: (row.sellers as Record<string, unknown> | null)?.city || '',
    condition: row.condition,
    description: row.product_description || '',
    product_pictures: images.map((img) => img.image_url),
    selling_price: row.product_selling_price,
    original_price: row.product_actual_price || 0,
    negotiable_price: row.is_negotiable || false,
    featured: row.is_featured || false,
    urgent: row.is_urgent || false,
    is_draft: row.is_draft || false,
    is_published: row.is_published || false,
    is_sold: row.is_sold || false,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const seller_id = searchParams.get('seller_id');
    const search = searchParams.get('search');
    const include_all = searchParams.get('include_all') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');

    let query = supabaseAdmin
      .from('products')
      .select('*, product_images(image_url, sort_order), sellers(city, store_name)')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (!include_all) {
      query = query.eq('is_published', true).eq('is_sold', false);
    }

    if (category) {
      query = query.eq('category_id', category);
    }
    if (seller_id) {
      query = query.eq('seller_id', seller_id);
    }
    if (search) {
      query = query.ilike('product_name', `%${search}%`);
    }

    const { data: products, error } = await query;

    if (error) {
      console.error('Products fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

    const mapped = (products || []).map(mapProduct);
    return NextResponse.json({ products: mapped });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      seller_id,
      category_id,
      product_name,
      product_description,
      product_actual_price,
      product_selling_price,
      condition,
      is_negotiable,
      is_urgent,
      is_featured,
      is_draft,
      product_pictures,
    } = body;

    if (!seller_id || !product_name || !product_selling_price || !category_id) {
      return NextResponse.json(
        { error: 'Seller ID, product name, category, and selling price are required' },
        { status: 400 }
      );
    }

    // Insert product
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .insert({
        seller_id,
        category_id,
        product_name,
        product_description: product_description || '',
        product_actual_price: product_actual_price ? parseFloat(product_actual_price) : 0,
        product_selling_price: parseFloat(product_selling_price),
        condition: condition || 'new',
        is_negotiable: is_negotiable || false,
        is_urgent: is_urgent || false,
        is_featured: is_featured || false,
        is_draft: is_draft || false,
        is_published: !is_draft,
        is_sold: false,
      })
      .select()
      .single();

    if (productError) {
      console.error('Product creation error:', productError);
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }

    // Insert product images if provided
    if (product_pictures && product_pictures.length > 0) {
      const imageRows = product_pictures.map((url: string, index: number) => ({
        product_id: product.product_id,
        image_url: url,
        is_primary: index === 0,
        sort_order: index,
      }));

      const { error: imageError } = await supabaseAdmin
        .from('product_images')
        .insert(imageRows);

      if (imageError) {
        console.error('Image insert error:', imageError);
      }
    }

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Post product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
