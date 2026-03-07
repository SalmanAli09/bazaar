import { NextRequest, NextResponse } from 'next/server';
import { getSellerStats } from '@/lib/supabase-database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Seller ID is required' },
        { status: 400 }
      );
    }

    const stats = await getSellerStats(id);

    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error('Error fetching seller stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
