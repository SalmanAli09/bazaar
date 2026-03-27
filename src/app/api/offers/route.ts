import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET offers for a specific buyer_request
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const buyerRequestId = searchParams.get('buyer_request_id');

    if (!buyerRequestId) {
      return NextResponse.json({ error: 'buyer_request_id is required' }, { status: 400 });
    }

    const { data: offers, error } = await supabaseAdmin
      .from('offers')
      .select('*, sellers(store_name, city, rating, is_verified, users(full_name, phone_number)), offer_images(image_url)')
      .eq('buyer_request_id', buyerRequestId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Offers fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
    }

    const mapped = (offers || []).map((o) => {
      const seller = o.sellers as Record<string, unknown> | null;
      const sellerUser = (seller?.users as Record<string, unknown>) || {};
      const images = (o.offer_images as Array<{ image_url: string }>) || [];

      return {
        id: o.offer_id,
        seller_id: o.seller_id,
        seller_name: (sellerUser.full_name as string) || '',
        store_name: (seller?.store_name as string) || '',
        seller_city: (seller?.city as string) || '',
        seller_rating: (seller?.rating as number) || 0,
        seller_verified: (seller?.is_verified as boolean) || false,
        offered_price: o.offered_price,
        seller_message: o.seller_message || '',
        offer_status: o.offer_status,
        images: images.map((img) => img.image_url),
        created_at: o.created_at,
      };
    });

    return NextResponse.json({ offers: mapped });
  } catch (error) {
    console.error('Offers GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST a new offer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { seller_id, buyer_request_id, offered_price, seller_message, image_urls } = body;

    if (!seller_id || !buyer_request_id || !offered_price) {
      return NextResponse.json(
        { error: 'seller_id, buyer_request_id, and offered_price are required' },
        { status: 400 }
      );
    }

    // Create the offer
    const { data: offer, error: offerError } = await supabaseAdmin
      .from('offers')
      .insert({
        seller_id,
        buyer_request_id,
        offered_price: parseFloat(offered_price),
        seller_message: seller_message || null,
        offer_status: 'pending',
      })
      .select()
      .single();

    if (offerError) {
      console.error('Offer creation error:', offerError);
      return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
    }

    // Insert offer images if provided
    if (image_urls && image_urls.length > 0) {
      const imageRows = image_urls.map((url: string) => ({
        offer_id: offer.offer_id,
        image_url: url,
      }));

      const { error: imageError } = await supabaseAdmin
        .from('offer_images')
        .insert(imageRows);

      if (imageError) {
        console.error('Offer images insert error:', imageError);
      }
    }

    return NextResponse.json({ offer }, { status: 201 });
  } catch (error) {
    console.error('Offer POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
