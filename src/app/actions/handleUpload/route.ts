import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
 
  if (filename !== null && request.body !== null) {
  const blob = await put(filename, request.body, {
    access: 'public',
  });
 
  return NextResponse.json(blob);
} else {
  // Handle the case when 'filename' is null
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
}
