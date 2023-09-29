import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432, 
});

export async function GET() {
  let exercises;

  try {
    const client = await pool.connect();

    try {
      exercises = await client.query('SELECT id, name FROM "WorkoutPlan";');
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ data: exercises });
}
