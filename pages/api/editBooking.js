import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("bookings");
        const { id } = req.query;
        const { title, content } = req.body;

        const booking = await db.collection("bookings").updateOne(
            {
                _id: ObjectId(id),
            },
            {
                $set: {
                    title: title,
                    content: content,
                },
            }
        );

        res.json(booking);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};
