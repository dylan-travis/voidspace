import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const { userId, id, bookingDate, bookingHour, date, confirmed, price, productName, productPrice, quantity } = req.body;

    const booking = await db.collection("bookings").insertOne({
      _id: new ObjectId(userId),
      userId: id,
      bookingDate,
      bookingHour,
      date,
      confirmed,
      price,
      productName,
      productPrice,
      quantity

    });

    res.json(booking);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};