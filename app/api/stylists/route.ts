import { NextRequest, NextResponse } from 'next/server';
import { getAllStylists, createStylist } from '../../../services/stylist.service';

export async function GET() {
  try {
    const stylists = await getAllStylists();
    return NextResponse.json({ data: stylists });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stylists' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    const stylist = await createStylist(body);
    return NextResponse.json({ data: stylist }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Stylist profile already exists for this user' }, { status: 409 });
    return NextResponse.json({ error: 'Failed to create stylist' }, { status: 500 });
  }
}
