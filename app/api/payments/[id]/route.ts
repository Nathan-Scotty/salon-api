import { NextRequest, NextResponse } from 'next/server';
import { getPaymentById, updatePayment, deletePayment } from '../../../../services/payment.service';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payment = await getPaymentById(Number(params.id));
    if (!payment) return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    return NextResponse.json({ data: payment });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch payment' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const payment = await updatePayment(Number(params.id), body);
    return NextResponse.json({ data: payment });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deletePayment(Number(params.id));
    return NextResponse.json({ data: { message: 'Payment deleted' } });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete payment' }, { status: 500 });
  }
}
