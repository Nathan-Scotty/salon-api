import { NextRequest, NextResponse } from 'next/server';
import { getClientById, updateClient, deleteClient } from '../../../../services/client.service';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await getClientById(Number(params.id));
    if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    return NextResponse.json({ data: client });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const client = await updateClient(Number(params.id), body);
    return NextResponse.json({ data: client });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteClient(Number(params.id));
    return NextResponse.json({ data: { message: 'Client deleted' } });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}
