import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct, getProductsBySeller } from '@/lib/supabase-database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('seller_id');
    const published = searchParams.get('published');
    
    let products;
    
    if (sellerId) {
      products = await getProductsBySeller(sellerId);
    } else {
      products = await getProducts();
    }

    if (published === 'true') {
      products = products.filter((product: any) => product.is_published && !product.is_sold);
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      seller_id,
      category_id,
      ad_title,
      city,
      condition,
      description,
      product_pictures,
      selling_price,
      original_price,
      negotiable_price,
      featured,
      urgent,
      is_draft,
      is_published
    } = body;

    if (!seller_id || !category_id || !ad_title || !city || !condition || !selling_price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const productData = {
      seller_id,
      category_id,
      ad_title,
      city,
      condition,
      description: description || '',
      product_pictures: product_pictures || [],
      selling_price: parseFloat(selling_price),
      original_price: original_price ? parseFloat(original_price) : 0,
      negotiable_price: negotiable_price || false,
      featured: featured || false,
      urgent: urgent || false,
      is_draft: is_draft || false,
      is_published: is_published || false,
      is_sold: false
    };

    const newProduct = await createProduct(productData);

    if (!newProduct) {
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Product created successfully',
        product: newProduct
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
