import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const { id } = req.query;

        const cart = await db.collection("carts").findOne({
            _id: ObjectId(id),
        });

        res.json(cart);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};