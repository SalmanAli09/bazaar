import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: requests, error } = await supabaseAdmin
      .from('buyer_requests')
      .select('*, users(full_name, email), categories(name)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Buyer requests fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
    }

    const mapped = (requests || []).map((r) => {
      const user = r.users as Record<string, unknown> | null;
      const category = r.categories as Record<string, unknown> | null;

      // Decode bytea hex string to URL string
      let imageUrl: string | null = null;
      if (r.request_reference_image) {
        try {
          const hex = (r.request_reference_image as string).replace(/^\\x/, '');
          imageUrl = Buffer.from(hex, 'hex').toString('utf-8');
        } catch {
          imageUrl = null;
        }
      }

      return {
        id: r.request_id,
        buyer_id: r.buyer_id,
        user: (user?.full_name as string) || 'Anonymous',
        title: r.title,
        description: r.description || '',
        budget_max: r.budget_max,
        category_id: r.category_id,
        category_name: (category?.name as string) || '',
        is_active: r.is_active,
        request_reference_image: imageUrl,
        created_at: r.created_at,
      };
    });

    return NextResponse.json({ requests: mapped });
  } catch (error) {
    console.error('Buyer requests GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { buyer_id, title, description, category_id, budget_max, request_reference_image } = body;

    if (!buyer_id || !title) {
      return NextResponse.json({ error: 'Buyer ID and title are required' }, { status: 400 });
    }

    // Encode URL string to hex for bytea column
    let imageBytes: string | null = null;
    if (request_reference_image) {
      imageBytes = '\\x' + Buffer.from(request_reference_image, 'utf-8').toString('hex');
    }

    const { data: newRequest, error } = await supabaseAdmin
      .from('buyer_requests')
      .insert({
        buyer_id,
        title,
        description: description || null,
        category_id: category_id || null,
        budget_max: budget_max ? parseFloat(budget_max) : null,
        is_active: true,
        request_reference_image: imageBytes,
      })
      .select()
      .single();

    if (error) {
      console.error('Buyer request creation error:', error);
      return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
    }

    return NextResponse.json({ request: newRequest }, { status: 201 });
  } catch (error) {
    console.error('Buyer request POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
