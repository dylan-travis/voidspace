import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const { userId } = req.body;

        const booking = await db.collection("bookings").deleteOne({
            _id: new ObjectId(userId),
        });

        res.json(booking);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};
