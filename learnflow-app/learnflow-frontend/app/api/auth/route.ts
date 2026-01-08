import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
    const { action, name, email, password } = await req.json();
    const client = await pool.connect();

    try {
        if (action === 'signup') {
            const hashed = await bcrypt.hash(password, 10);
            const res = await client.query(
                'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
                [name, email, hashed]
            );
            return NextResponse.json(res.rows[0]);
        }

        if (action === 'login') {
            const res = await client.query('SELECT * FROM "user" WHERE email = $1', [email]);
            const user = res.rows[0];
            if (user && await bcrypt.compare(password, user.password)) {
                const { password: _, ...safeUser } = user;
                return NextResponse.json(safeUser);
            }
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }
    } catch (e: unknown) {
        return NextResponse.json({ error: "User already exists or database error" }, { status: 500 });
    } finally {
        client.release();
    }
}