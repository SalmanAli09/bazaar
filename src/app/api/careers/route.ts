import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: jobs, error } = await supabaseAdmin
      .from('careers')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Careers fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 });
    }

    return NextResponse.json({ jobs: jobs || [] });
  } catch (error) {
    console.error('Careers error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, department, location, type, description, requirements } = body;

    if (!title || !department || !location) {
      return NextResponse.json({ error: 'Title, department, and location are required' }, { status: 400 });
    }

    const { data: job, error } = await supabaseAdmin
      .from('careers')
      .insert({ title, department, location, type: type || 'Full-time', description, requirements, is_active: true })
      .select()
      .single();

    if (error) {
      console.error('Career creation error:', error);
      return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
    }

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error('Career POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('careers')
      .delete()
      .eq('job_id', id);

    if (error) {
      console.error('Career delete error:', error);
      return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Job deleted' });
  } catch (error) {
    console.error('Career DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
