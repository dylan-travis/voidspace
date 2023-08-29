import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const { userId, productId } = req.query; // Updated variable name

    const result = await db.collection("carts").updateOne(
      { _id: new ObjectId(userId) },
      {
        $pull: { items: { productId } } // Use productId here
      }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: "Product deleted from cart successfully" });
    } else {
      res.status(404).json({ error: "Product not found in the cart" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred" }); // Return 500 status code for server errors
  }
};
