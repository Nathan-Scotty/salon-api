import { NextRequest, NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '../../../../services/user.service';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserById(Number(params.id));
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ data: user });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const user = await updateUser(Number(params.id), body);
    return NextResponse.json({ data: user });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteUser(Number(params.id));
    return NextResponse.json({ data: { message: 'User deleted' } });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
