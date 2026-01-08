import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const MASTER_TEACHER_EMAIL = "admin@learnflow.com";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const client = await pool.connect();

    try {
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      if (user && (await bcrypt.compare(password, user.password))) {
        // Force role to teacher for the master email
        if (email === MASTER_TEACHER_EMAIL) {
          user.role = 'teacher';
        }
        
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({ success: true, user: userWithoutPassword });
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}