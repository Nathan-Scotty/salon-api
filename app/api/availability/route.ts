import { NextRequest, NextResponse } from 'next/server';
import { getAllAvailabilities, createAvailability } from '../../../services/availability.service';

export async function GET(req: NextRequest) {
  try {
    const stylistId = req.nextUrl.searchParams.get('stylistId');
    const availableOnly = req.nextUrl.searchParams.get('available') === 'true';
    const slots = await getAllAvailabilities(
      stylistId ? Number(stylistId) : undefined,
      availableOnly
    );
    return NextResponse.json({ data: slots });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { stylistId, date, startTime, endTime } = body;
    if (!stylistId || !date || !startTime || !endTime) {
      return NextResponse.json({ error: 'stylistId, date, startTime, and endTime are required' }, { status: 400 });
    }
    const slot = await createAvailability(body);
    return NextResponse.json({ data: slot }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create availability slot' }, { status: 500 });
  }
}
