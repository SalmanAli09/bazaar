import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');

    let query = supabaseAdmin
      .from('users')
      .select('user_id, email, full_name, phone_number, role, city, country, is_active, created_at')
      .neq('role', 'admin')
      .order('created_at', { ascending: false });

    if (role) {
      query = query.eq('role', role);
    }

    const { data: users, error } = await query;

    if (error) {
      console.error('Admin users fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    return NextResponse.json({ users: users || [] });
  } catch (error) {
    console.error('Admin users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH - block/unblock user
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, is_active } = body;

    if (!user_id || typeof is_active !== 'boolean') {
      return NextResponse.json({ error: 'user_id and is_active required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('users')
      .update({ is_active })
      .eq('user_id', user_id);

    if (error) {
      console.error('Admin user update error:', error);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    return NextResponse.json({ message: is_active ? 'User unblocked' : 'User blocked' });
  } catch (error) {
    console.error('Admin user PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
