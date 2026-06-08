import { NextRequest, NextResponse } from 'next/server';
import {
  getServicesByAppointment,
  addServiceToAppointment,
  removeServiceFromAppointment,
  updateAppointmentServicePrice,
} from '../../../services/appointmentService.service';

export async function GET(req: NextRequest) {
  try {
    const appointmentId = req.nextUrl.searchParams.get('appointmentId');
    if (!appointmentId) return NextResponse.json({ error: 'appointmentId query param is required' }, { status: 400 });
    const services = await getServicesByAppointment(Number(appointmentId));
    return NextResponse.json({ data: services });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch appointment services' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { appointmentId, serviceId, priceAtTime } = body;
    if (!appointmentId || !serviceId || priceAtTime === undefined) {
      return NextResponse.json({ error: 'appointmentId, serviceId, and priceAtTime are required' }, { status: 400 });
    }
    const entry = await addServiceToAppointment(body);
    return NextResponse.json({ data: entry }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Service already added to this appointment' }, { status: 409 });
    return NextResponse.json({ error: 'Failed to add service to appointment' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { appointmentId, serviceId, priceAtTime } = body;
    if (!appointmentId || !serviceId || priceAtTime === undefined) {
      return NextResponse.json({ error: 'appointmentId, serviceId, and priceAtTime are required' }, { status: 400 });
    }
    const entry = await updateAppointmentServicePrice(appointmentId, serviceId, priceAtTime);
    return NextResponse.json({ data: entry });
  } catch {
    return NextResponse.json({ error: 'Failed to update appointment service price' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { appointmentId, serviceId } = body;
    if (!appointmentId || !serviceId) {
      return NextResponse.json({ error: 'appointmentId and serviceId are required' }, { status: 400 });
    }
    await removeServiceFromAppointment(appointmentId, serviceId);
    return NextResponse.json({ data: { message: 'Service removed from appointment' } });
  } catch {
    return NextResponse.json({ error: 'Failed to remove service from appointment' }, { status: 500 });
  }
}
