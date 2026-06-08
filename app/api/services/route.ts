import { NextRequest, NextResponse } from 'next/server';
import { getAllServices, createService } from '../../../services/service.service';

export async function GET(req: NextRequest) {
  try {
    const activeOnly = req.nextUrl.searchParams.get('active') === 'true';
    const services = await getAllServices(activeOnly);
    return NextResponse.json({ data: services });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, price, durationMin } = body;
    if (!name || price === undefined || !durationMin) {
      return NextResponse.json({ error: 'name, price, and durationMin are required' }, { status: 400 });
    }
    const service = await createService(body);
    return NextResponse.json({ data: service }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
