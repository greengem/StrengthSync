import { NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get('category');
  
  const { rows } = await sql`SELECT name, category FROM exercises WHERE category=${category} LIMIT 500`;

  return NextResponse.json(rows);
}
