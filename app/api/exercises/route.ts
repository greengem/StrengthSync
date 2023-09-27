import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await db.connect();
  let exercises;

  try {
    exercises = await client.sql`SELECT id, name, category FROM exercises;`;
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ data: exercises });
}
