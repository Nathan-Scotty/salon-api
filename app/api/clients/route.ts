import { NextRequest, NextResponse } from 'next/server';
import { getAllClients, createClient } from '../../../services/client.service';

export async function GET() {
  try {
    const clients = await getAllClients();
    return NextResponse.json({ data: clients });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    const client = await createClient(body);
    return NextResponse.json({ data: client }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Client profile already exists for this user' }, { status: 409 });
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
