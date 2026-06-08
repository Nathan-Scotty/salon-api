import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost } from '../../../services/post.service';

export async function GET(req: NextRequest) {
  try {
    const publishedOnly = req.nextUrl.searchParams.get('published') === 'true';
    const posts = await getAllPosts(publishedOnly);
    return NextResponse.json({ data: posts });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.authorId) {
      return NextResponse.json({ error: 'authorId is required' }, { status: 400 });
    }
    const post = await createPost(body);
    return NextResponse.json({ data: post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
