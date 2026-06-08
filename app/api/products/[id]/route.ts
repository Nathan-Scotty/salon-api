import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '../../../../services/product.service';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await getProductById(Number(params.id));
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ data: product });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const product = await updateProduct(Number(params.id), body);
    return NextResponse.json({ data: product });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteProduct(Number(params.id));
    return NextResponse.json({ data: { message: 'Product deleted' } });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
