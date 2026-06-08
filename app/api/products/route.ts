import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '../../../services/product.service';

export async function GET(req: NextRequest) {
  try {
    const activeOnly = req.nextUrl.searchParams.get('active') === 'true';
    const products = await getAllProducts(activeOnly);
    return NextResponse.json({ data: products });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, price } = body;
    if (!name || price === undefined) {
      return NextResponse.json({ error: 'name and price are required' }, { status: 400 });
    }
    const product = await createProduct(body);
    return NextResponse.json({ data: product }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
