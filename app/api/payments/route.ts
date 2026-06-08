import { NextRequest, NextResponse } from 'next/server';
import { getAllPayments, createPayment } from '../../../services/payment.service';

export async function GET() {
  try {
    const payments = await getAllPayments();
    return NextResponse.json({ data: payments });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { appointmentId, clientId, amount } = body;
    if (!appointmentId || !clientId || amount === undefined) {
      return NextResponse.json({ error: 'appointmentId, clientId, and amount are required' }, { status: 400 });
    }
    const payment = await createPayment(body);
    return NextResponse.json({ data: payment }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Payment already exists for this appointment' }, { status: 409 });
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
