import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, createUser } from '../../../services/user.service';

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json({ data: users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, passwordHash, phone, role, avatarUrl } = body;

    if (!name || !email || !passwordHash) {
      return NextResponse.json({ error: 'name, email, and passwordHash are required' }, { status: 400 });
    }

    const user = await createUser({ name, email, passwordHash, phone, role, avatarUrl });
    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
