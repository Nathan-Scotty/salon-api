import { NextRequest, NextResponse } from 'next/server';
import { getServiceById, updateService, deleteService } from '../../../../services/service.service';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const service = await getServiceById(Number(params.id));
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    return NextResponse.json({ data: service });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const service = await updateService(Number(params.id), body);
    return NextResponse.json({ data: service });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteService(Number(params.id));
    return NextResponse.json({ data: { message: 'Service deleted' } });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
