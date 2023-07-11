import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("bookings");
    const { title, description, name, date, hour } = req.body;

    const booking = await db.collection("bookings").insertOne({
      title,
      description,
      name,
      date,
      hour
    });

    res.json(booking);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};