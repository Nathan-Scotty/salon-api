import { NextRequest, NextResponse } from 'next/server';
import { getStylistById, updateStylist, deleteStylist } from '../../../../services/stylist.service';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const stylist = await getStylistById(Number(params.id));
    if (!stylist) return NextResponse.json({ error: 'Stylist not found' }, { status: 404 });
    return NextResponse.json({ data: stylist });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stylist' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const stylist = await updateStylist(Number(params.id), body);
    return NextResponse.json({ data: stylist });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Stylist not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update stylist' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteStylist(Number(params.id));
    return NextResponse.json({ data: { message: 'Stylist deleted' } });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Stylist not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete stylist' }, { status: 500 });
  }
}
