import { NextRequest, NextResponse } from 'next/server';
import { getMediaById, updateMedia, deleteMedia } from '../../../../services/media.service';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const media = await getMediaById(Number(params.id));
    if (!media) return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    return NextResponse.json({ data: media });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const media = await updateMedia(Number(params.id), body);
    return NextResponse.json({ data: media });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update media' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteMedia(Number(params.id));
    return NextResponse.json({ data: { message: 'Media deleted' } });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
