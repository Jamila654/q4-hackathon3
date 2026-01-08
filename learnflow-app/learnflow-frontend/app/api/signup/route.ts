import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:learnflow123@localhost:5433/learnflow',
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await pool.connect();

    try {
      // Simple table (users), simple columns
      const result = await client.query(
        'INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
        [uuidv4(), name, email, hashedPassword, role || 'student']
      );

      return NextResponse.json({ success: true, user: result.rows[0] });
    } finally {
      client.release();
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Signup Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}