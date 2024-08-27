import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req);
    
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        // Destructuring the request body as an object
        const { email, name, password } = req.body;

        // Check if the user already exists
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(422).json({ error: 'Email taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user in the database
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: " ",
                emailVerified: new Date(),
            },
        });

        // Respond with the created user
        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
