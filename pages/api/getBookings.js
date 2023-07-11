import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("bookings");

    const bookings = await db.collection("bookings").find({}).limit(20).toArray();

    res.json(bookings);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};