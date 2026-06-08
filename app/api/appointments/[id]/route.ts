import { NextRequest, NextResponse } from 'next/server';
import { getAppointmentById, updateAppointment, deleteAppointment } from '../../../../services/appointment.service';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const appointment = await getAppointmentById(Number(params.id));
    if (!appointment) return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    return NextResponse.json({ data: appointment });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch appointment' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const appointment = await updateAppointment(Number(params.id), body);
    return NextResponse.json({ data: appointment });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteAppointment(Number(params.id));
    return NextResponse.json({ data: { message: 'Appointment deleted' } });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
  }
}
