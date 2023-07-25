import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from 'next-auth/react';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const usersCollection = db.collection('users');
        const userId = req.query.userId;

        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });


        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { username, email, phone, address } = user;

        return res.status(200).json({ username, email, phone, address });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}