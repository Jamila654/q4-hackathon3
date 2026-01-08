import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET() {
    const client = await pool.connect();
    try {
        const res = await client.query(`
            SELECT u.id, u.name, u.email, 
            COUNT(p.id) as topics_completed,
            COALESCE(AVG(p.score), 0) as average_score
            FROM "user" u
            LEFT JOIN progress p ON u.email = p.user_email
            WHERE u.role = 'student'
            GROUP BY u.id, u.name, u.email
        `);
        return NextResponse.json(res.rows);
    } finally {
        client.release();
    }
}