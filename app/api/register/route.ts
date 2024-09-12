import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
    try {
        const { email, name, password } = await req.json(); // Extract name from the payload

        if (!email || !name || !password) {
            return NextResponse.json({ error: 'Email, name, and Password are required' }, { status: 400 });
        }

        const existingUser = await prismadb.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Email taken' }, { status: 422 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name: name, // Save name as name in the database
                hashedPassword,
                image: " ",
                emailVerified: new Date(),
            },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
