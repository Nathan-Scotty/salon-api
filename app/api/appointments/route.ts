import { NextRequest, NextResponse } from 'next/server';
import { getAllAppointments, createAppointment } from '../../../services/appointment.service';

export async function GET() {
  try {
    const appointments = await getAllAppointments();
    return NextResponse.json({ data: appointments });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, stylistId, scheduledAt } = body;
    if (!clientId || !stylistId || !scheduledAt) {
      return NextResponse.json({ error: 'clientId, stylistId, and scheduledAt are required' }, { status: 400 });
    }
    const appointment = await createAppointment(body);
    return NextResponse.json({ data: appointment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}
