import { NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get('category');
  
  const { rows } = await sql`SELECT name, category, category FROM exercises WHERE category=${category} LIMIT 50`;

  return NextResponse.json(rows);
}
