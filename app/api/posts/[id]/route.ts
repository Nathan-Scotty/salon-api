import { NextRequest, NextResponse } from 'next/server';
import { getPostById, updatePost, deletePost } from '../../../../services/post.service';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = await getPostById(Number(params.id));
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json({ data: post });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const post = await updatePost(Number(params.id), body);
    return NextResponse.json({ data: post });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deletePost(Number(params.id));
    return NextResponse.json({ data: { message: 'Post deleted' } });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
