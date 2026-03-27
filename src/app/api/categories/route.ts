import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: categories, error } = await supabaseAdmin
      .from('categories')
      .select('category_id, name, icon_name, bg_color, text_color, item_count')
      .order('name');

    if (error) {
      console.error('Categories fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }

    // Get real product counts per category
    const { data: counts } = await supabaseAdmin
      .from('products')
      .select('category_id')
      .eq('is_published', true)
      .eq('is_sold', false);

    const countMap: Record<string, number> = {};
    (counts || []).forEach((p) => {
      countMap[p.category_id] = (countMap[p.category_id] || 0) + 1;
    });

    const enriched = (categories || []).map((cat) => ({
      ...cat,
      item_count: countMap[cat.category_id] || cat.item_count || 0,
    }));

    return NextResponse.json({ categories: enriched });
  } catch (error) {
    console.error('Categories error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, icon_name, bg_color, text_color } = body;

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const { data: category, error } = await supabaseAdmin
      .from('categories')
      .insert({
        name,
        icon_name: icon_name || 'tag',
        bg_color: bg_color || '#f1f5f9',
        text_color: text_color || '#64748b',
        item_count: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Category creation error:', error);
      return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error('Category POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    // Check if any products use this category
    const { count } = await supabaseAdmin
      .from('products')
      .select('product_id', { count: 'exact', head: true })
      .eq('category_id', id);

    if (count && count > 0) {
      return NextResponse.json(
        { error: `Cannot delete: ${count} product(s) are using this category` },
        { status: 409 }
      );
    }

    const { error } = await supabaseAdmin
      .from('categories')
      .delete()
      .eq('category_id', id);

    if (error) {
      console.error('Category delete error:', error);
      return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Category DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
