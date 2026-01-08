import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email');
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT topic_name FROM progress WHERE user_email = $1', [email]);
        return NextResponse.json(res.rows.map(row => row.topic_name));
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
    } finally {
        client.release();
    }
}

export async function POST(req: NextRequest) {
    const { email, topic, action } = await req.json();
    const client = await pool.connect();
    
    try {
        if (action === 'undo') {
            // Remove the record if the user wants to undo
            await client.query(
                'DELETE FROM progress WHERE user_email = $1 AND topic_name = $2',
                [email, topic]
            );
            return NextResponse.json({ success: true, status: 'removed' });
        } else {
            // Add the record (complete)
            await client.query(
                'INSERT INTO progress (user_email, topic_name) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                [email, topic]
            );
            return NextResponse.json({ success: true, status: 'added' });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Database operation failed" }, { status: 500 });
    } finally {
        client.release();
    }
}