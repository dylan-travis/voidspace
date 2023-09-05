import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const { userId } = req.query;

        const cart = await db.collection("carts").findOne({
            userId
        });

        if (cart) {
            // If a cart was found, return it as JSON
            res.json(cart);
        } else {
            // If no cart was found for the given userId, return an appropriate response
            res.status(404).json({ error: "Cart not found" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};