import { NextResponse } from 'next/server';
import { QueryParamsType } from 'src/types/queryParams';

import { parseQueryParams } from '@/lib/utils/parseQueryParams';

const JSON_SERVER_URL = process.env.BASE_SERVER_URL; // Update with your json-server URL

export async function POST(request: Request) {
  try {
    // Parse the body of the POST request
    const body = await request.json();
    const queryParams = parseQueryParams(body as QueryParamsType);

    const url = `${JSON_SERVER_URL}/products${queryParams}`;

    // Fetch products with related authors
    const response = await fetch(`${url}`, {
      cache: 'no-store' // Ensure fresh data on every request
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from JSON Server');
    }

    const products = await response.json();

    // Filter author fields (avatar and lastName only)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processedProducts = products.map((product: any) => product);

    return NextResponse.json(processedProducts, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
