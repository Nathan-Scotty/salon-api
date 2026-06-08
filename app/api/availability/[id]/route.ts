import { NextRequest, NextResponse } from 'next/server';
import { getAvailabilityById, updateAvailability, deleteAvailability } from '../../../../services/availability.service';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const slot = await getAvailabilityById(Number(params.id));
    if (!slot) return NextResponse.json({ error: 'Availability slot not found' }, { status: 404 });
    return NextResponse.json({ data: slot });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch availability slot' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const slot = await updateAvailability(Number(params.id), body);
    return NextResponse.json({ data: slot });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Availability slot not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update availability slot' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteAvailability(Number(params.id));
    return NextResponse.json({ data: { message: 'Availability slot deleted' } });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Availability slot not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete availability slot' }, { status: 500 });
  }
}
