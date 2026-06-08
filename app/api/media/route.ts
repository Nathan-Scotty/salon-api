import { NextRequest, NextResponse } from 'next/server';
import { getMediaByPost, createMedia } from '../../../services/media.service';

export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get('postId');
    if (!postId) return NextResponse.json({ error: 'postId query param is required' }, { status: 400 });
    const media = await getMediaByPost(Number(postId));
    return NextResponse.json({ data: media });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, url } = body;
    if (!postId || !url) {
      return NextResponse.json({ error: 'postId and url are required' }, { status: 400 });
    }
    const media = await createMedia(body);
    return NextResponse.json({ data: media }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create media entry' }, { status: 500 });
  }
}
